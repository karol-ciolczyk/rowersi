<script setup lang="ts">
import debounce from "lodash.debounce";
import type { Place } from "~/services/mapbox/types";
import { API } from "~/services";
const search = ref<string>("");
const model = defineModel<Place>();
let items = ref<Place[]>();

// watch(search, async () => {
//   const plainText = search.value.replace(
//     /[^a-zA-Z0-9 śŚńŃęĘąĄćĆżŻźŹłŁóÓ]/g,
//     "",
//   );
//   console.log(plainText);

//   const { data } = await useFetch(
//     `https://api.mapbox.com/geocoding/v5/mapbox.places/${plainText}.json?country=pl&access_token=pk.eyJ1Ijoia2FyY2lvIiwiYSI6ImNrcTd6YjExejAxc3kyb3BrcnBzY252em4ifQ.emytj-LkRX7RcGueM2S9HA`,
//   );

//   items.value = data.value?.features || [];
//   console.log(items);
// });
watch(
  search,
  debounce(async () => {
    const plainText = search.value.replace(
      /[^a-zA-Z0-9 śŚńŃęĘąĄćĆżŻźŹłŁ]/g,
      "",
    );

    const { data } = await API.mapbox.getPlaces({ search: plainText });

    console.log(data.value?.features);
    items.value = data.value?.features;
  }, 500),
);
</script>

<template>
  <v-autocomplete
    v-model="model"
    v-model:search="search"
    label="Autocomplete"
    item-title="place_name"
    item-value="place_name"
    :items="items"
    no-filter
    return-object
  />
</template>
