<script setup lang="ts">
import debounce from "lodash.debounce";
import type { Place } from "~/services/mapbox/types/geocodingApi";
import { API } from "~/services";

const place = ref<Place>();
const search = ref<string>("");
const items = defineModel<{ places: Place[]; index: number }>("items");
const selected = defineModel<Place>("selected");

const { index } = defineProps<{
  index: number;
  // showItems?: boolean;
}>();
// const emit = defineEmits<{
// (
//   e: "setCoordinate",
//   payload: { index: number | undefined; place: Place | undefined },
// ): void;
// (e: "items", payload: { items: Place[] }): void;
// }>();

// watch(place, (newPlace) => {
//   emit("setCoordinate", { index, place: newPlace });
// });

watch(
  search,
  debounce(async () => {
    const plainText = search.value.replace(
      /[^a-zA-Z0-9 śŚńŃęĘąĄćĆżŻźŹłŁ]/g,
      "",
    );

    const { data } = await API.mapbox.getPlaces({ search: plainText });

    items.value = { places: data.value?.features || [], index };
  }, 500),
);
</script>

<template>
  <v-autocomplete
    v-model="selected"
    v-model:search="search"
    item-title="place_name"
    item-value="place_name"
    no-filter
    return-object
    chips
    clearable
    hide-no-data
    menu-icon=""
  >
    <template v-slot:append>
      <slot name="append"></slot>
    </template>
    <template v-slot:chip="{ props, item }">
      <v-chip
        v-bind="props"
        :text="item.raw.place_name.slice(0, 39) + '...'"
      ></v-chip>
    </template>
  </v-autocomplete>
</template>
