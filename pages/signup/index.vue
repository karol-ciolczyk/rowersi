<script setup lang="ts">
import { ref } from "vue";

const show = ref(false);
const rules = {
  required: (value) => !!value || "Required.",
  min: (v) => v.length >= 8 || "Min 8 characters",
};
</script>

<template>
  <v-container class="mt-10 fill-height">
    <v-col>
      <v-row justify="center" class="mb-10">
        <div class="text-h2">Fill out signup form</div>
      </v-row>
      <v-row justify="center">
        <v-col cols="6">
          <v-text-field label="username" variant="outlined"></v-text-field>
          <v-text-field
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
    </v-col>
  </v-container>
</template>
