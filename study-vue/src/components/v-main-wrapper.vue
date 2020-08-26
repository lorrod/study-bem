<template>
  <div class="v-main-wrapper">
    <vCatalog />
  </div>
</template>


<script>

  import vCatalog from './v-catalog/v-catalog.vue'


  export default {
    name: 'v-main-wrapper',
    components: {
      vCatalog
    },
    props: {},
    data () {
      return {

      }
    },
    computed: {},//вычислительные функции
    methods: {},//клики действия пользователя
    watch: {},
    mounted() {
      console.log("hello world");
    }
  }
</script>


<style lang="scss">
  .v-main-wrapper {
    max-width: 900px;
    margin: 0 auto;
  }
</style>
