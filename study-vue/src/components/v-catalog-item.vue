<template lang="html">

  <div class="v-catalog-item">
    <img class="v-catalog-item__image" :src="require(`../assets/img/${product_data.image}`)" alt="image-logo">
    <p class="v-catalog-item__name">{{ product_data.name }}</p>
    <p class="v-catalog-item__price">Price: {{ product_data.price }}</p>
    <v-btn fab dark color="indigo"
            class="v-catalog-item__add_to_cart btn"
            @click="toParent('remove-article')"
            v-if="checkCart(product_data.article)"><v-icon dark>mdi-minus</v-icon></v-btn>
    <v-btn fab dark color="indigo"
            class="v-catalog-item__add_to_cart"
            @click="toParent('send-article')">
          <v-icon dark>mdi-plus</v-icon>
    </v-btn>

  </div>

</template>

<script>

  export default {
    name: 'v-catalog-item',
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
    computed: {},
    methods: {
      toParent(method) {
        this.$emit(method, this.product_data)
      },
      checkCart(article) {

        return this.$store.state.cart.filter( item => item.article == article ).length
      }
    }
  }

</script>

<style lang="scss">

  .v-catalog-item {
    flex-basis: 25%;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: $padding;
    margin-bottom: $margin;
    &__image {
      height: 100%;
      width: 100%;
      max-width: 250px;
    }
  }

</style>
