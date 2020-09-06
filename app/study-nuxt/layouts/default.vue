<template>
  <v-app class="app" dark>
    <vHeader />
    <nuxt class="app__content" />
  </v-app>
</template>

<script>
import vHeader from '../components/v-header/v-header.vue'

export default {
  name: 'App',
  components: {
    vHeader,
  },
}
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
