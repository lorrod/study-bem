<template>
  <div class="Item">


    <vItem
      :id="id"         
      @send-article="addChild"
      @remove-article="deleteChild"/>

    <p>{{ id }}</p>

  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import vItem from '../components/v-item/v-item.vue'

export default {
  name: 'Item',
  props: {
    id: {
      type: String,
      default: "Vue!"
    }
  },
  data() {
    return {
    }
  },
  components: {
    vItem
  },
  methods: {
    ...mapMutations(['ADD_TO_CART', 'DELETE_FROM_CART']),
    addChild(data) {
      this.ADD_TO_CART(data)
    },
    deleteChild(data) {
      this.DELETE_FROM_CART(data)
    }
  }
}

</script>

<style>

</style>
