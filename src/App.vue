<template>
  <the-layout>
    <router-view></router-view>
  </the-layout>
</template>

<script>
import TheLayout from "./components/TheLayout.vue";

export default {
  components: {
    TheLayout,
  },
  setup() {},
};
</script>
