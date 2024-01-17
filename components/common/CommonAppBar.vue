<script setup>
import { Routing } from "~/constants/Routing";
const router = useRouter();
console.log(router);
function login() {
  navigateTo("/login");
  // router.replace("/login");
}
</script>

<template>
  <v-app-bar app color="primary">
    <v-app-bar-title class="title" to="/">
      <CommonNuxtLinkPlain :to="Routing.HOME"> Rowersi </CommonNuxtLinkPlain>
    </v-app-bar-title>

    <v-app-bar-nav-icon />

    <template v-slot:append>
      <v-btn :to="Routing.NEW_TRIP">New trip</v-btn>
      <v-btn to="/login">Sign in</v-btn>
      <v-btn @click="login">Sign in login()</v-btn>
      <v-btn href="https://rowersi-2474fa2672fd.herokuapp.com/login"
        >Sign in link v-btn</v-btn
      >
      <v-btn>Sign up</v-btn>
    </template>
  </v-app-bar>
</template>
