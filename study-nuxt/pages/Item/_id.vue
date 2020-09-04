<template>
  <div class="Item">
    <vItem
      :id="this.$route.params.id"
      @send-article="addChild"
      @remove-article="deleteChild"
    />

    <p>{{ this.$route.params.id }}</p>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import vItem from '@/components/v-item/v-item.vue'

export default {
  name: 'Item',
  components: {
    vItem,
  },
  data() {
    return {}
  },
  methods: {
    ...mapMutations(['ADD_TO_CART', 'DELETE_FROM_CART']),
    addChild(data) {
      this.ADD_TO_CART(data)
    },
    deleteChild(data) {
      this.DELETE_FROM_CART(data)
    },
  },
}
</script>

<style></style>
