<template lang="html">
  <div class="v-cart">
    <div class="v-cart__list">
      <vCatalogItem class="v-cart__item"
        v-for="product in this.$store.state.cart"
        :key='product.article'
        :product_data='product'
        @send-article="addChild"
        @remove-article="deleteChild"/>
    </div>
    <div class="v-cart__empty"
          v-if="this.$store.state.count_items === 0">
      There is no items in cart.
      Add items <router-link to="/">here</router-link>
    </div>
    <button class="v-cart__total"
            type="button"
            name="button">Pay: {{ cartTotalCost }}</button>
  </div>
</template>




<script>
import vCatalogItem from './v-catalog-item.vue'
import { mapMutations } from 'vuex'

export default {
  name: 'v-cart',
  components: {
    vCatalogItem
  },
  computed: {
    cartTotalCost() {
      var result = 0;
      for (let item of this.$store.state.cart) {
        result += item.price * item.count;
      }
    return result
    }
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

<style lang="scss" scoped>

.v-cart {
  &__list {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: $margin;
  }
  &__total {
    position: fixed;
    bottom: 0;
    right:0;
    left: 0;
    width: 100%;
    padding: $padding $padding;
    display: flex;
    justify-content: center;
    background: green;
    color: white;
    font-size: 25px;
  }
  &__item {
    display: flex;
    flex-direction: column;
    max-height: 400px;
    flex-wrap: wrap;
    align-items: center;
    width: 90%;
  }
}
</style>
