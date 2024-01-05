import { useFetch } from "nuxt/app";
import type { MapboxGeocodingApiResponse, getPlacesParams } from "./types";

const token =
  "pk.eyJ1Ijoia2FyY2lvIiwiYSI6ImNrcTd6YjExejAxc3kyb3BrcnBzY252em4ifQ.emytj-LkRX7RcGueM2S9HA";

async function getPlaces(params: getPlacesParams) {
  return await useFetch<MapboxGeocodingApiResponse>(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${params.search}.json?country=pl&access_token=${token}`,
  );
}

export default {
  getPlaces,
};
