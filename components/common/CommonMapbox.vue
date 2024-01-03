<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import mapboxgl from "mapbox-gl";
import directionsStyle from "~/constants/directions-style";

let mapContainer = ref(null);
mapboxgl.accessToken =
  "pk.eyJ1Ijoia2FyY2lvIiwiYSI6ImNrcTd6YjExejAxc3kyb3BrcnBzY252em4ifQ.emytj-LkRX7RcGueM2S9HA";
let map: null | any = null;

onMounted(() => {
  import("@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions").then(
    (module) => {
      const MapboxDirections = module.default;
      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        profile: "mapbox/cycling",
        unit: "metric",
        styles: directionsStyle,
        interactive: false,
        alternatives: false,
        language: "pl",
        congestion: true,
        steps: true,
        controls: {
          inputs: false,
          instructions: false,
          profileSwitcher: true,
        },
        zoom: 7,
      });

      map = new mapboxgl.Map({
        container: mapContainer.value,
        style: "mapbox://styles/karcio/ckr3m2igg5uin18p3iolzcdmp", // Replace with your preferred map style
        center: [19.52, 50.1],
        zoom: 11,
      });
      map.addControl(new mapboxgl.FullscreenControl(), "bottom-left");
      const nav = new mapboxgl.NavigationControl();
      map.addControl(nav, "bottom-left");
      map.addControl(directions, "top-left");
    },
  );
});
onUnmounted(() => {
  if (map) {
    map.remove();
    map = null;
  }
});
</script>

<template>
  <div ref="mapContainer" class="map-container" />
</template>

<style>
.map-container {
  height: 80vh;
  width: 100%;
  margin: auto;
}
</style>
