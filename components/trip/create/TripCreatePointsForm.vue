<script setup lang="ts">
import type { Place } from "~/services/mapbox/types";

const items = ref(["item0"]);
const tripCoordinates = ref<Place[]>([]);

const emit = defineEmits<{
  (e: "tripCoordinates", tripCoordinates: Place[]): void;
}>();

watch(
  tripCoordinates,
  (newCoordinates) => {
    emit("tripCoordinates", newCoordinates);
  },
  { deep: true },
);

function addItem() {
  items.value.push("item" + items.value.length);
}
function onSetCoordinate({
  index,
  place,
}: {
  index: number | undefined;
  place: any;
}) {
  if (index !== undefined) tripCoordinates.value[index] = place;
}
</script>

<template>
  <h1>Create trip</h1>
  <template :key="item" v-for="(item, index) in items">
    <CommonMapboxAutocomplete
      :index="index"
      @set-coordinate="onSetCoordinate"
    />
  </template>
  <v-btn @click="addItem">Add point</v-btn>
</template>
