<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import mapboxgl from "mapbox-gl";
// import Directions from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";

const mapContainer = ref(null);
mapboxgl.accessToken =
  "pk.eyJ1Ijoia2FyY2lvIiwiYSI6ImNrcTd6YjExejAxc3kyb3BrcnBzY252em4ifQ.emytj-LkRX7RcGueM2S9HA";
const map = null;

onMounted(() => {
  map = new mapboxgl.Map({
    container: mapContainer,
    style: "mapbox://styles/mapbox/streets-v12", // Replace with your preferred map style
    center: [-71.224518, 42.213995],
    zoom: 9,
  });
});
onUnmounted(() => {
  map.remove();
  map = null;
});

// let directions = new Directions({
//   accessToken: mapboxgl.accessToken,
//   profile: "mapbox/cycling",
//   unit: "metric",
//   styles: style,
//   interactive: false,
//   alternatives: false,
//   language: "pl",
//   congestion: true,
//   steps: true,
//   controls: {
//     inputs: false,
//     instructions: false,
//     profileSwitcher: true,
//   },
//   zoom: 7,
// });
</script>

<template>
  <div>New trip</div>
  <div ref="mapContainer" />
</template>
