<script setup lang="ts">
import { ref } from "vue";
import { API } from "~/services";

const username = ref("");
const password = ref("");
const show = ref(false);
const rules = {
  required: (value) => !!value || "Required.",
  min: (v) => v.length >= 8 || "Min 8 characters",
};

async function submit(event) {
  const result = await event;
  console.log(event);
  if (result.valid) {
    console.log(result);
    console.log("sfdsf");
    API.auth.signIn({
      username: username.value,
      password: password.value,
    });
  }
}
</script>

<template>
  <v-form fast-fail @submit.prevent="submit" class="fill-height">
    <v-container class="fill-height">
      <v-col justify="center">
        <v-row justify="center" class="mb-10">
          <div class="text-h2">Fill out sign-in form</div>
        </v-row>
        <v-row justify="center">
          <v-col cols="6">
            <v-text-field
              v-model="username"
              label="username"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              v-model="password"
              :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show ? 'text' : 'password'"
              variant="outlined"
              name="password"
              label="Password"
              hint="At least 8 characters"
              counter
              @click:append-inner="show = !show"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <V-btn type="submit" color="primary">Sign up</V-btn>
        </v-row>
      </v-col>
    </v-container>
  </v-form>
</template>
