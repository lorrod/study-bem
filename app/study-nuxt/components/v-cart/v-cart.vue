<template lang="html">
  <div class="v-cart">
    <div class="v-cart__list">
      <vCartItem
        v-for="product in this.$store.state.cart"
        :key="product.article"
        class="v-cart__item"
        :product_data="product"
        @send-article="addChild"
        @remove-article="deleteChild"
      />
    </div>
    <div v-if="this.$store.state.count_items === 0" class="v-cart__empty">
      There is no items in cart. Add items <nuxt-link to="/">here</nuxt-link>
    </div>
    <div data-app>
      <vCartAddressModal
        :show-address-modal="showAddressModal"
        :total-money="cartTotalCost"
        @send-usr-data="receiveUsrData"
      />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
import vCartItem from './v-cart-item.vue'
import vCartAddressModal from './v-cart-address-modal.vue'

export default {
  name: 'VCart',
  components: {
    vCartItem,
    vCartAddressModal,
  },
  data() {
    return {
      showAddressModal: false,
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
    cartTotalCost() {
      let result = 0
      for (const item of this.$store.state.cart) {
        result += item.price * item.count
      }
      return result
    },
  },
  methods: {
    ...mapMutations(['ADD_TO_CART', 'DELETE_FROM_CART']),
    ...mapActions(['POST_ORDER']),

    addChild(data) {
      this.ADD_TO_CART(data)
    },
    deleteChild(data) {
      this.DELETE_FROM_CART(data)
    },
    receiveUsrData(data) {
      this.POST_ORDER(data)
      console.log(data)
    },
  },
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
}
</style>
