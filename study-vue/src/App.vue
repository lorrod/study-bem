<template>
  <div class="app">
    <vHeader />
    <router-view class="app__content"/>
  </div>
</template>


<script>
import vHeader from "./components/v-header/v-header.vue";

export default {
  components: {
    vHeader,
  },
  name: "app"
};
</script>

<style lang="scss">
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  &__content {
      text-align: center;
  }
}
</style>
