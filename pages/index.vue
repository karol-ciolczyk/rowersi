<script setup lang="ts">
const employeesStore = useEmployeesStore();
</script>

<template>
  <img src="~/assets/img/bcg.jpg" alt="Discover your trip" />
  <v-btn prepend-icon="$vuetify" color="primary"> Button </v-btn>
  <v-btn
    prepend-icon="$vuetify"
    color="primary"
    @click="employeesStore.dispatchGetEmployees"
  >
    Fetch employees
  </v-btn>
  <CommonMapboxAutocomplete />
  <TripCreatePointsForm />
</template>
