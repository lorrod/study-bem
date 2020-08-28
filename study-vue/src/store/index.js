import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
      products: [],
      cart: [],
      count_items: 0,
      error: '',
      token: localStorage.getItem("user-token") || "",
      login: localStorage.getItem("username") || "none",
      status: ''
    },
    mutations: {
      REGISTER_REQUEST(state) {
        state.status = "loading";
      },
      AUTH_REQUEST(state) {
        state.status = "loading";
      },
      AUTH_SUCCESS(state,resp) {
        state.status = "success";
        state.token = resp.data.token;
        //state.hasLoadedOnce = true;
      },
      AUTH_ERROR(state) {
        state.status = "error";
        //state.hasLoadedOnce = true;
      },
      AUTH_LOGOUT(state) {
        state.token = "";
      },
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
      REGISTER_REQUEST({ commit, dispatch }, user) {
        return new Promise((resolve, reject) => {
          commit("REGISTER_REQUEST");
          axios({url: 'http://127.0.0.1:5000/register', data: user, method: 'POST' })
            .then(resp => {
              console.log(resp);
              console.log(resp.data.token);
              localStorage.setItem("user-token", resp.data.token);
              localStorage.setItem("username", user.username);
              axios.defaults.headers.common['Authorization'] = "Bearer "+resp.data.token;
              commit("AUTH_SUCCESS", resp);
              dispatch("USER_REQUEST");
              resolve(resp);
            })
            .catch(err => {
              commit("AUTH_ERROR", err);
              localStorage.removeItem("user-token");
              reject(err);
            });
        });
      },
      AUTH_REQUEST({ commit, dispatch }, user) {
        return new Promise((resolve, reject) => {
          commit("AUTH_REQUEST");
          axios({url: 'http://127.0.0.1:5000/login', data: user, method: 'POST' })
            .then(resp => {
              console.log(resp);
              console.log(resp.data.token);
              localStorage.setItem("user-token", resp.data.token);
              localStorage.setItem("username", user.username);
              axios.defaults.headers.common['Authorization'] = "Bearer "+resp.data.token;
              commit("AUTH_SUCCESS", resp);
              dispatch("USER_REQUEST");
              resolve(resp);
            })
            .catch(err => {
              commit("AUTH_ERROR", err);
              localStorage.removeItem("user-token");
              reject(err);
            });
        });
      },
      AUTH_LOGOUT({ commit }) {
        return new Promise(resolve => {
          commit("AUTH_LOGOUT");
          localStorage.removeItem("user-token");
          localStorage.removeItem("username");
          resolve();
        });
      },
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
      },
        isAuthenticated: state => !!state.token,
        getLogin: state => state.login,
        authStatus: state => state.status
    }
  });

export default store;
