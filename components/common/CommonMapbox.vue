<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import mapboxgl from "mapbox-gl";
import directionsStyle from "~/constants/directions-style";
import type { Place } from "~/services/mapbox/types";
import { getWaypointMarker } from "~/utils/helpers/getWaypointMarker";

const autocompleteValue = ref("");
const markers = ref<any[]>([]);
const tripCoordinates = ref<Place[]>([]);

let directions: any = null;
let mapContainer = ref(null);
mapboxgl.accessToken =
  "pk.eyJ1Ijoia2FyY2lvIiwiYSI6ImNrcTd6YjExejAxc3kyb3BrcnBzY252em4ifQ.emytj-LkRX7RcGueM2S9HA";
let map: null | any = null;

function removeRoute() {
  directions.removeRoutes();
  markers.value.forEach((marker) => {
    console.log(marker);
    marker.remove();
  });
  markers.value = [];
}
// function setDestination() {
//   // Alwernia coordinates
//   directions.setDestination([19.539674, 50.069043]);

//   const el = getWaypointMarker();

//   new mapboxgl.Marker(el)
//     .setLngLat([19.539674, 50.069043])
//     .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>"))
//     .addTo(map);
// }
// const sampleRoutePoints = {
//   origin: [19.411739, 50.141413],
//   destination: [19.526844, 50.100241],
//   destinationName:
//     "Tenczyńska 86, 32-566 Nieporaz, Lesser Poland Voivodeship, Poland",
// };
// function addRoute(routePoints, waypoints) {
//   directions.removeRoutes(); // must be here to prevent duplicating waypoints

//   if (directions._map?._markers[0]) directions._map._markers[0].remove();
//   if (routePoints.origin) {
//     directions.setOrigin(routePoints.origin);
//     const el = getWaypointMarker();

//     const coordinates = routePoints.origin;

//     markers.value.push(
//       new mapboxgl.Marker(el)
//         .setLngLat(coordinates)
//         .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>"))
//         .addTo(map),
//     );
//   }
//   if (routePoints.destination) {
//     directions.setDestination(routePoints.destination);
//     const coordinates = routePoints.destination;
//     markers.value.push(
//       new mapboxgl.Marker({
//         color: "red",
//       })
//         .setLngLat(coordinates)
//         .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>"))
//         .addTo(map),
//     );
//   }
// }

onMounted(() => {
  import("@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions").then(
    (module) => {
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

watch(
  tripCoordinates,
  (newCoordinates: Place[]) => {
    removeRoute();
    const places = [...newCoordinates];
    const originPoint = places.shift();
    const destinationPoint = places.pop();
    //after shift() and pop() on places array now is array of waypoints between origin and destination

    if (originPoint) {
      const coordinates = originPoint.geometry.coordinates;
      const el = getWaypointMarker();

      directions.setOrigin(coordinates);
      markers.value.push(
        new mapboxgl.Marker(el)
          .setLngLat(coordinates)
          .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>"))
          .addTo(map),
      );
    }
    if (destinationPoint) {
      const coordinates = destinationPoint.geometry.coordinates;

      directions.setDestination(coordinates);

      markers.value.push(
        new mapboxgl.Marker({
          color: "red",
        })
          .setLngLat(coordinates)
          .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>"))
          .addTo(map),
      );
    }
    if (places.length) {
      places.forEach((place, index) => {
        const coordinates = place.geometry.coordinates;
        const el = getWaypointMarker();

        directions.addWaypoint(index, coordinates);
        markers.value.push(
          new mapboxgl.Marker(el)
            .setLngLat(coordinates)
            .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>"))
            .addTo(map),
        );
      });
    }
  },
  { deep: true },
);
function onTripCoordinates(places: Place[]) {
  console.log(places);
  tripCoordinates.value = places;
}
</script>

<template>
  <div ref="mapContainer" class="map-container" />
  <!-- <v-btn @click="addRoute(sampleRoutePoints, {})">Add Route </v-btn> -->
  <!-- <v-btn @click="removeRoute">Directions.removeRoute() </v-btn> -->
  <!-- <v-btn @click="setDestination">Directions.setDestination() </v-btn> -->
  <TripCreatePointsForm @trip-coordinates="onTripCoordinates" />
  <div>
    {{ autocompleteValue }}
  </div>
</template>

<style>
.map-container {
  height: 80vh;
  width: 100%;
  margin: auto;
}
</style>
