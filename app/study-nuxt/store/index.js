import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations/mutations.js'
import actions from './actions/actions.js'
import getters from './getters/getters.js'

Vue.use(Vuex)

const store = () =>
  new Vuex.Store({
    state: {
      products: [],
      cart: [],
      count_items: 0,
      error: '',
      token: '',
      login: null,
      status: '',
    },
    mutations, // синхронно
    actions, // асинхронно
    getters,
  })
export default store
