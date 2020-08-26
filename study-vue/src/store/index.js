import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
      products: [],
      cart: [],
      count_items: 0,
      error: ''
    },
    mutations: {
      SET_PRODUCTS_TO_STATE(state , products )  {
        state.products = products;
      },
      ADD_TO_CART(state , payload) {
        var elem = state.cart.filter( item => payload.article === item.article);

        if (elem.length == 0) {
          payload.count = 1;
          state.cart.push(payload);
        } else {
          if (elem[0].left <= elem[0].count) {
            return
            }
            for (var i = 0; i<state.cart.length; i++) {
              if (state.cart[i].article === payload.article) {
                console.log(state.cart[i]);
                state.cart[i].count++;
                break;
              }
            }
          }
          state.count_items++;
          state.cart = state.cart.sort();
        },
      DELETE_FROM_CART(state, payload) {
        var elem = state.cart.filter( item => payload.article === item.article);
        state.count_items--;

        if (elem[0].count > 1) {
          for (var i = 0; i<state.cart.length; i++) {
            if (state.cart[i].article === payload.article) {
              state.cart[i].count--;
              break;
            }
          }
        } else {
          state.cart = state.cart.filter( item => payload.article !== item.article);
          return
        }
        state.cart = state.cart.sort();
      }
    },//синхронно
    actions: {
      GET_PRODUCTS_FROM_API({commit}){
        return axios("http://localhost:3000/products",{
          method: "GET"
        })
          .then((products) => {
            commit('SET_PRODUCTS_TO_STATE', products.data);
            return products;
          })
          .catch((error) => {
            console.log(error);
          })
      },
      GET_PRODUCT_FROM_API(state , id){
        var elem = state.cart = this.state.cart.filter( item => id === item.article);
        if (elem.length != 0) {
            return elem[0]
        }
        return axios("http://localhost:3000/products?article="+id,{
          method: "GET"
        })
          .then((product) => {
            return product.data[0];
          })
          .catch((error) => {
            console.log(error);
          })
      }
    },//асинхронно
    getters: {//получение из state значений
      PRODUCTS(state) {
        return state.products
      }
    }
  });

export default store;
