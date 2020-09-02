import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations/mutations.js'
import actions from './actions/actions.js'
import getters from './getters/getters.js'


Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
      products: [],
      cart: JSON.parse(localStorage.getItem("cart")) || [],
      count_items: JSON.parse(localStorage.getItem("count_items")) || 0,
      error: '',
      token: localStorage.getItem("user-token") || "",
      login: localStorage.getItem("username") || "none",
      status: ''
    },
    mutations,//синхронно
    actions,//асинхронно
    getters,
  });

export default store;
