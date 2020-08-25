<template lang="html">

  <div class="v-cart-item">
    <div class="v-cart-item__image-container">
      <img class="v-cart-item__image" :src="require(`../assets/img/${product_data.image}`)" alt="image-logo">
    </div>
    <div class="v-cart-item__info">
      <p class="info__name">{{ product_data.name }}</p>
      <p class="info__price">Price: {{ product_data.price }}</p>
      <p class="v-catalog-item__price">Availble: {{ product_data.left }}</p>
      <div class="count-btns">
        <p class="info__count">Tickets: {{ product_data.count }}</p>
        <v-btn fab dark color="indigo"
                class="count-btns__add_to_cart btn"
                @click="toParent('remove-article')"
                v-if="checkCart(product_data.article)"><v-icon dark>mdi-minus</v-icon></v-btn>
        <v-btn fab dark color="indigo"
                class="count-btns__add_to_cart btn"
                @click="toParent('send-article')">
              <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </div>
      <div class="v-cart-item__chances">
        <v-app>
          <p>Chances to win:</p>
          <v-progress-linear
              :value="this.product_data.count / this.product_data.total*100"
              height="25"
            >
            <strong>{{ Math.ceil(this.product_data.count / this.product_data.total*100) }}%</strong>
          </v-progress-linear>
        </v-app>
      </div>
    </div>

  </div>

</template>

<script>

  export default {
    name: 'v-cart-item',
    props: {
      product_data: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
      }
    },
    computed: {
    },
    methods: {
      toParent(method) {
        this.$emit(method, this.product_data);
      },
      checkCart(article) {

        return this.$store.state.cart.filter( item => item.article == article ).length
      }
    },
  }

</script>

<style lang="scss">

  .v-cart-item {

    display: flex;
    flex-direction: row;
    max-height: 400px;
    width: 90%;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: $padding;
    margin-bottom: $margin;
    justify-content: space-between;
    &__image {
      height: 100%;
      width: 100%;
      max-width: 250px;
    }
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 60%;
    }
    &__chances {
      height: 65px;
      overflow: hidden;
    }
  }

</style>
