<template>
  <div class="v-main-wrapper">
    <vCatalog />
  </div>
</template>

<script>
import vCatalog from './v-catalog/v-catalog.vue'

export default {
  name: 'VMainWrapper',
  components: {
    vCatalog,
  },
  props: {},
  data() {
    return {}
  },
  computed: {}, // клики действия пользователя
  watch: {},
  mounted() {}, // вычислительные функции
  methods: {},
}
</script>

<style lang="scss">
.v-main-wrapper {
  max-width: 900px;
  margin: 0 auto;
}
</style>
