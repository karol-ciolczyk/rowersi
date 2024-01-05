<script setup lang="ts">
const items = ref(["item0"]);

function addItem() {
  items.value.push("item" + items.value.length);
}
</script>

<template>
  <template :key="item" v-for="item in items">
    <CommonMapboxAutocomplete />
  </template>
  <v-btn @click="addItem">Add point</v-btn>
</template>
