<script setup lang="ts">
import debounce from "lodash.debounce";
import type { Place } from "~/services/mapbox/types";
import { API } from "~/services";

const { index } = defineProps<{
  index?: number;
}>();
const emit = defineEmits<{
  (
    e: "setCoordinate",
    payload: { index: number | undefined; place: typeof place },
  ): void;
}>();
const search = ref<string>("");
const place = ref<Place>();
let items = ref<Place[]>();

watch(place, () => {
  emit("setCoordinate", { index, place });
});

watch(
  search,
  debounce(async () => {
    const plainText = search.value.replace(
      /[^a-zA-Z0-9 śŚńŃęĘąĄćĆżŻźŹłŁ]/g,
      "",
    );

    const { data } = await API.mapbox.getPlaces({ search: plainText });

    // console.log(data.value?.features);
    items.value = data.value?.features;
  }, 500),
);
</script>

<template>
  <v-autocomplete
    v-model="place"
    v-model:search="search"
    label="Autocomplete"
    item-title="place_name"
    item-value="place_name"
    :items="items"
    no-filter
    return-object
  />
</template>
