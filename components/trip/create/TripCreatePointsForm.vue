<script setup lang="ts">
import type { Place } from "~/services/mapbox/types/geocodingApi";

const autocompleteItems = ref<{ places: Place[]; index: number }>();

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
// function onSetCoordinate({
//   index,
//   place,
// }: {
//   index: number | undefined;
//   place: any;
// }) {
//   if (index !== undefined) tripCoordinates.value[index] = place;
// }
function disableButton(itemsLength: number, coordinatesLength: number) {
  if ((itemsLength === 1 || coordinatesLength === 1) && itemsLength < 2)
    disabled.value = false;
  else if (itemsLength !== coordinatesLength) disabled.value = true;

  if (itemsLength === coordinatesLength) disabled.value = false;
}
function updateSeleted(selection: [{ item: Place; index: number }]) {
  if (selection) {
    console.log(selection);
    tripCoordinates.value[selection[0].index] = selection[0].item;
  }
  // autocompleteSelected.value = selection[0];
}
</script>

<template>
  <h1>Create trip</h1>
  <v-container :style="{ maxWidth: `600px` }">
    <v-timeline density="compact" side="end" truncate-line="both">
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
            <!-- @set-coordinate="onSetCoordinate" -->
            <CommonMapboxAutocomplete
              :index="index"
              variant="solo"
              density="compact"
              v-model:items="autocompleteItems"
              v-model:selected="tripCoordinates[index]"
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
  <div>
    <v-card
      v-if="autocompleteItems?.places.length"
      class="mx-auto"
      max-width="400"
    >
      <v-list @update:selected="(selected) => updateSeleted(selected as any)">
        <v-list-item
          v-for="item in autocompleteItems?.places"
          :key="item.id"
          :value="{ item, index: autocompleteItems?.index }"
          :title="item.place_name"
        />
      </v-list>
    </v-card>
  </div>

  <!-- <template :key="item" v-for="(item, index) in items">
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
  </template> -->
  <v-btn @click="addItem" :disabled="disabled">Add point</v-btn>
</template>
