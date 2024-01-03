<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import mapboxgl from "mapbox-gl";
import directionsStyle from "~/constants/directions-style";

let directions: any = null;
let mapContainer = ref(null);
mapboxgl.accessToken =
  "pk.eyJ1Ijoia2FyY2lvIiwiYSI6ImNrcTd6YjExejAxc3kyb3BrcnBzY252em4ifQ.emytj-LkRX7RcGueM2S9HA";
let map: null | any = null;

onMounted(() => {
  import("@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions").then(
    (module) => {
      console.log(directionsStyle);
      const MapboxDirections = module.default;
      const drs = new MapboxDirections({
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
      map.addControl(drs, "top-left");

      directions = drs;
    },
  );
});
onUnmounted(() => {
  if (map) {
    map.remove();
    map = null;
  }
});

const sampleRoutePoints = {
  origin: [19.411739, 50.141413],
  destination: [19.526844, 50.100241],
  destinationName:
    "Tenczyńska 86, 32-566 Nieporaz, Lesser Poland Voivodeship, Poland",
};
function addRoute(routePoints, waypoints) {
  directions.removeRoutes(); // must be here to prevent duplicating waypoints

  if (directions._map?._markers[0]) directions._map._markers[0].remove();
  if (routePoints.origin) {
    directions.setOrigin(routePoints.origin);
    const el = document.createElement("div");
    el.className = "originElement";
    const coordinates = routePoints.origin;
    new mapboxgl.Marker(el)
      .setLngLat(coordinates)
      .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>"))
      .addTo(map.current);
  }
  if (routePoints.destination) {
    directions.setDestination(routePoints.destination);
    const coordinates = routePoints.destination;
    new mapboxgl.Marker({
      color: "red",
    })
      .setLngLat(coordinates)
      .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>"))
      .addTo(map.current);
  }
  // if (Object.keys(waypoints).length > 0) {
  //   const waypointNumbers = Object.keys(waypoints);
  //   waypointNumbers.forEach((number) => {
  //     const coordinates = waypoints[number];
  //     const figure = Number(number);
  //     directions.addWaypoint(figure, coordinates);
  //   });
  // }
}
</script>

<template>
  <div ref="mapContainer" class="map-container" />
  <v-btn @click="addRoute(sampleRoutePoints, {})">Add Route</v-btn>
</template>

<style>
.map-container {
  height: 80vh;
  width: 100%;
  margin: auto;
}
</style>
