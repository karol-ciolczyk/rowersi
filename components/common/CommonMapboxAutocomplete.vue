<script setup lang="ts">
import debounce from "lodash.debounce";
import type { Place } from "~/services/mapbox/types";
import { API } from "~/services";

const place = ref<Place>();
const search = ref<string>("");
let items = ref<Place[]>();

const { index } = defineProps<{
  index?: number;
}>();
const emit = defineEmits<{
  (
    e: "setCoordinate",
    payload: { index: number | undefined; place: Place | undefined },
  ): void;
}>();

watch(place, (newPlace) => {
  emit("setCoordinate", { index, place: newPlace });
});

watch(
  search,
  debounce(async () => {
    const plainText = search.value.replace(
      /[^a-zA-Z0-9 śŚńŃęĘąĄćĆżŻźŹłŁ]/g,
      "",
    );

    const { data } = await API.mapbox.getPlaces({ search: plainText });

    items.value = data.value?.features;
  }, 500),
);
</script>

<template>
  <v-autocomplete
    v-model="place"
    v-model:search="search"
    item-title="place_name"
    item-value="place_name"
    :items="items"
    no-filter
    return-object
    chips
    clearable
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
