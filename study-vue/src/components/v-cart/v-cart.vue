<template lang="html">
  <div class="v-cart">
    <div class="v-cart__list">
      <vCartItem class="v-cart__item"
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
    <div data-app>
      <vCartAddressModal
        :showAddressModal="showAddressModal"
        @send-usr-data="receiveUsrData"
        :totalMoney="cartTotalCost"/>
    </div>

  </div>
</template>




<script>
import vCartItem from './v-cart-item.vue'
import vCartAddressModal from './v-cart-address-modal.vue'
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  name: 'v-cart',
  data() {
    return {
      showAddressModal: false
    }
  },
  components: {
    vCartItem,
    vCartAddressModal
  },
  computed: {
    ...mapGetters([ "isAuthenticated" ]),
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
    ...mapActions(['POST_ORDER']),

    addChild(data) {
      this.ADD_TO_CART(data)
    },
    deleteChild(data) {
      this.DELETE_FROM_CART(data)
    },
    receiveUsrData(data) {
      this.POST_ORDER(data)
      console.log(data);
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
}
</style>
