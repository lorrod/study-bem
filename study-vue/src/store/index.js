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

        state.count_items++;

        if (elem.length == 0) {
          payload.count = 1;
          state.cart.push(payload);
        } else {
          payload.count++;
          console.log(payload);
        }

        var others = state.cart.filter( item => payload.article !== item.article);
        others.push(payload);
        state.cart = others;

      },
      DELETE_FROM_CART(state, payload) {
        var elem = state.cart.filter( item => payload.article === item.article);
        console.log(elem);
        state.count_items--;

        if (elem[0].count > 1) {
          payload.count--;
          console.log("MINUSSSS");
        } else {
          state.cart = state.cart.filter( item => payload.article !== item.article);
          return
        }

        var others = state.cart.filter( item => payload.article !== item.article);
        others.push(payload);
        state.cart = others;
        //state.cart = state.cart.filter( item => payload.article !== item.article);
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
      }
    },//асинхронно
    getters: {//получение из state значений
      PRODUCTS(state) {
        return state.products
      }
    }
  });

export default store;
