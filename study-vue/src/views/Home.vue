<template>
  <div id="app">
    <vMainWrapper />
  </div>
</template>

<script>

import vMainWrapper from '../components/v-main-wrapper.vue'

export default {
  name: 'App',
  data() {
    return {
      todos: ['Work', 'Study', 'Breakfast']
    }
  },
  components: {
    vMainWrapper
  },
  methods: {
    deleteTodo(i) {
      this.todos.splice(i, 1)
    }
  }
}
</script>

<style>

</style>
