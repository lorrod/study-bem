<template>
  <div class="v-item">
    <v-app>
      <div class="v-item__images-container">
        <v-carousel
          cycle
          height="auto"
          delimiter-icon="mdi-plus"
          show-arrowa-on-hover>
          <v-carousel-item
            v-for="(image, i) in product_data.images"
            :key="i">
            <img
              class="v-cart-item__image"
              :src="require(`@/assets/img/${image}`)"
              alt="image-logo">
          </v-carousel-item>
        </v-carousel>
      </div>
    </v-app>
    <div class="v-item__info">
      <div class="v-item__info-static">
        <p class="v-item__name">{{ product_data.name }}</p>
        <hr>
        <p class="v-item__descr">{{ product_data.description }}</p>
        <hr>
        <p class="v-item__price">Price: {{ product_data.price }}</p>
        <p class="v-item__price">Availble: {{ product_data.left }}</p>
      </div>
      <div class="item__info-dynamic">
        <div class="count-btns">
          <p class="v-item__count" v-if="checkCart(id)">Your tickets: {{ product_data.count }}</p>
          <v-btn fab dark color="indigo"
                  class="count-btns__add_to_cart btn"
                  @click="toParent('remove-article')"
                  v-if="checkCart(id)"><v-icon dark>mdi-minus</v-icon></v-btn>
          <v-btn fab dark color="indigo"
                  class="count-btns__add_to_cart btn"
                  @click="toParent('send-article')">
                <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </div>
        <div class="v-item__chances">
          <v-app v-if="checkCart(id)">
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
</div>
</template>


<script>
  import { mapActions } from 'vuex'


  export default {
    name: 'v-item',
    components: {
    },
    props: {
      id: {
        type: String,
        default: "T1"
      }
    },
    data () {
      return {
        product_data: {},
      }
    },
    computed: {},//вычислительные функции
    methods: {//клики действия пользователя
      ...mapActions(['GET_PRODUCT_FROM_API']),
      toParent(method) {
        this.$emit(method, this.product_data)
      },
      checkCart(article) {
        this.$store.state.cart.filter( item => item.article == article ).length
      }
    },
    mounted() {
      this.GET_PRODUCT_FROM_API(this.id).then(response => {
        this.product_data = response;
      });
    }
  }
</script>


<style lang="scss">
.v-item {

  display: flex;
  flex-direction: row;
  height: 400px;
  width: 90%;
  box-shadow: 0 0 8px 0 #e0e0e0;
  padding: $padding;
  margin-bottom: $margin;
  justify-content: space-between;
  &__images-container {
    height: 100%;
    width: 250px;
  }
  &__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 60%;
    &-dynamic {

    }
    &-static {

    }
  }
  &__chances {
    height: 65px;
    overflow: hidden;
  }
}

</style>
