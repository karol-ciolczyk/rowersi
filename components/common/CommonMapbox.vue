<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import mapboxgl from "mapbox-gl";
import directionsStyle from "~/constants/directions-style";
import type { Place } from "~/services/mapbox/types";

const autocompleteValue = ref("");
const search = ref("");
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
function setDestination() {
  // Alwernia coordinates
  directions.setDestination([19.539674, 50.069043]);

  const el = document.createElement("div");
  el.style.height = "13px";
  el.style.width = "13px";
  el.style.backgroundColor = "#fff";
  el.style.borderRadius = "50%";
  el.style.border = "2px solid #000";
  new mapboxgl.Marker(el)
    .setLngLat([19.539674, 50.069043])
    .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>"))
    .addTo(map);
}

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

      directions.setOrigin(coordinates);
      const el = document.createElement("div");
      el.style.height = "13px";
      el.style.width = "13px";
      el.style.backgroundColor = "#fff";
      el.style.borderRadius = "50%";
      el.style.border = "2px solid #000";

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
        directions.addWaypoint(index, coordinates);

        const el = document.createElement("div");
        el.style.height = "13px";
        el.style.width = "13px";
        el.style.backgroundColor = "#fff";
        el.style.borderRadius = "50%";
        el.style.border = "2px solid #000";

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
    el.style.height = "13px";
    el.style.width = "13px";
    el.style.backgroundColor = "#fff";
    el.style.borderRadius = "50%";
    el.style.border = "2px solid #000";

    const coordinates = routePoints.origin;

    markers.value.push(
      new mapboxgl.Marker(el)
        .setLngLat(coordinates)
        .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>"))
        .addTo(map),
    );
  }
  if (routePoints.destination) {
    directions.setDestination(routePoints.destination);
    const coordinates = routePoints.destination;
    markers.value.push(
      new mapboxgl.Marker({
        color: "red",
      })
        .setLngLat(coordinates)
        .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>"))
        .addTo(map),
    );
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
function onTripCoordinates(places: Place[]) {
  tripCoordinates.value = places;
}
</script>

<template>
  <div ref="mapContainer" class="map-container" />
  <v-btn @click="addRoute(sampleRoutePoints, {})">Add Route </v-btn>
  <v-btn @click="removeRoute">Directions.removeRoute() </v-btn>
  <v-btn @click="setDestination">Directions.setDestination() </v-btn>
  <TripCreatePointsForm @trip-coordinates="onTripCoordinates" />
  <div>
    {{ autocompleteValue }}
  </div>

  <!-- <section>
    <v-autocomplete
      v-model="autocompleteValue"
      v-model:search="search"
      clearable
      chips
      label="Autocomplete"
      :items="[
        'California',
        'Colorado',
        'Florida',
        'Georgia',
        'Texas',
        'Wyoming',
      ]"
    ></v-autocomplete>
  </section> -->
</template>

<style>
.map-container {
  height: 80vh;
  width: 100%;
  margin: auto;
}

.originElement {
  width: 13px;
  height: 13px;
  background-color: #fff;
  border-radius: 50%;
  border: 2px solid #000;
}
</style>
