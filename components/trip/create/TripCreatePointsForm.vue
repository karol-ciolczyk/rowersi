<script setup lang="ts">
import type { Place } from "~/services/mapbox/types";

const items = ref(["item0"]);
const tripCoordinates = ref<Place[]>([]);
let disabled = ref(false);

const emit = defineEmits<{
  (e: "tripCoordinates", tripCoordinates: Place[]): void;
}>();

watch(
  [items, tripCoordinates],
  ([newItems, newCoordinates]) => {
    disableButton(newItems.length, newCoordinates.length);
    emit("tripCoordinates", newCoordinates);
  },
  { deep: true },
);

function addItem() {
  items.value.push("item" + items.value.length);
}
function removeItem() {
  if (items.value.length === tripCoordinates.value.length) {
    items.value.pop();
    tripCoordinates.value.pop();
  } else items.value.pop();
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
function disableButton(itemsLength: number, coordinatesLength: number) {
  if ((itemsLength === 1 || coordinatesLength === 1) && itemsLength < 2)
    disabled.value = false;
  else if (itemsLength !== coordinatesLength) disabled.value = true;

  if (itemsLength === coordinatesLength) disabled.value = false;
}
</script>

<template>
  <h1>Create trip</h1>
  <v-container :style="{ maxWidth: `600px` }">
    <v-timeline density="compact" side="end" truncate-line="start">
      <v-timeline-item
        :key="item"
        v-for="(item, index) in items"
        fill-dot
        class="mb-12"
        :dot-color="index === items.length - 1 ? 'red' : 'grey'"
        size="tiny"
      >
        <v-row :style="{ width: '600px' }">
          <v-col cols="8">
            <CommonMapboxAutocomplete
              :index="index"
              @set-coordinate="onSetCoordinate"
              variant="solo"
              density="compact"
            />
          </v-col>
          <v-col cols="4">
            <v-btn
              v-if="index === items.length - 1 && items.length !== 1"
              @Click="removeItem"
            >
              X
            </v-btn>
          </v-col>
        </v-row>
      </v-timeline-item>
    </v-timeline>
  </v-container>
  <template :key="item" v-for="(item, index) in items">
    <div>
      <CommonMapboxAutocomplete
        :index="index"
        @set-coordinate="onSetCoordinate"
        density="compact"
        chips
        clearable
      />
      <v-btn
        v-if="index === items.length - 1 && items.length !== 1"
        @Click="removeItem"
      >
        Remove
      </v-btn>
    </div>
  </template>
  <v-btn @click="addItem" :disabled="disabled">Add point</v-btn>
</template>
