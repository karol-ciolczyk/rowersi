<script setup>
function clicker() {
  console.log(search);
}
function onNewTrip() {
  console.log("new trip");
}
function onLogin() {
  console.log("login");
}
</script>

<template>
  <v-app-bar app color="primary">
    <v-app-bar-title class="title" to="/" @click="clicker">
      Rowersi
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <v-app-bar-nav-icon @click="console.log()"></v-app-bar-nav-icon>

    <template v-slot:append>
      <v-btn @click="onNewTrip">New trip</v-btn>
      <v-btn @click="onLogin">Login</v-btn>
    </template>
  </v-app-bar>
</template>
