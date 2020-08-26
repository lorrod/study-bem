<template lang="html">
  <div class="v-catalog">
    <h1>My wardrobe</h1>
    <div class="v-catalog__list">
      <vCatalogItem
        v-for="product in this.$store.state.products"
        :key="product.article"
        :product_data="product"
        @send-article="addChild"
        @remove-article="deleteChild" />
    </div>
  </div>
</template>



<script>

  import vCatalogItem from './v-catalog-item.vue'
  import { mapActions, mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'v-catalog',
    components: {
      vCatalogItem
    },
    props: {
      product_data: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {}
    },
    computed: {
      ...mapGetters(['PRODUCTS'])
    },
    methods: {
      ...mapActions(['GET_PRODUCTS_FROM_API']),
      ...mapMutations(['ADD_TO_CART', 'DELETE_FROM_CART']),
      addChild(data) {
        this.ADD_TO_CART(data)
      },
      deleteChild(data) {
        this.DELETE_FROM_CART(data)
      }
    },
    mounted() {
      this.GET_PRODUCTS_FROM_API().then(response => {
        console.log(response)
      })
    }
  }

</script>

<style lang="scss">

  .v-catalog {
    &__list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      margin-top: $margin;
    }
    &__cart {
      align-items: flex-start;
    }
  }

</style>
