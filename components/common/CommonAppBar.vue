<script setup>
import { Routing } from "~/constants/Routing";

function onLogin() {
  console.log("login");
}
</script>

<template>
  <v-app-bar app color="primary">
    <v-app-bar-title class="title" to="/">
      <CommonNuxtLinkPlain :to="Routing.HOME"> Rowersi </CommonNuxtLinkPlain>
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <v-app-bar-nav-icon @click="console.log()"></v-app-bar-nav-icon>

    <template v-slot:append>
      <v-btn :to="Routing.NEW_TRIP">New trip</v-btn>
      <v-btn @click="onLogin">Login</v-btn>
    </template>
  </v-app-bar>
</template>
