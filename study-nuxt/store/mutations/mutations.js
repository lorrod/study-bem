import axios from 'axios'

export default {
  REGISTER_REQUEST(state) {
    state.status = 'loading'
  },
  AUTH_REQUEST(state) {
    state.status = 'loading'
  },
  AUTH_SUCCESS(state, resp) {
    state.status = 'success'
    state.token = resp.data.token
    state.login = resp.data.username
    localStorage.setItem('username', resp.data.username)
    localStorage.setItem('user-token', resp.data.token)
    // state.hasLoadedOnce = true;
  },
  AUTH_ERROR(state) {
    state.status = 'error'
    localStorage.removeItem('user-token')
    // state.hasLoadedOnce = true;
  },
  AUTH_LOGOUT(state) {
    state.token = ''
    state.login = ''
    localStorage.removeItem('user-token')
    localStorage.removeItem('username')
  },
  SET_PRODUCTS_TO_STATE(state, products) {
    state.products = products
  },
  POSTED(state) {
    state.status = 'order-posted'
    this.cart = []
    this.count_items = 0
    localStorage.removeItem('cart')
    localStorage.removeItem('count_items')
    // state.hasLoadedOnce = true;
  },
  GET_ERROR(state) {
    state.status = 'error'
    // state.hasLoadedOnce = true;
  },
  ADD_TO_CART(state, payload) {
    const elem = state.cart.filter((item) => payload.article === item.article)

    if (elem.length === 0) {
      payload.count = 1
      state.cart.push(payload)
      localStorage.setItem('cart', JSON.stringify(state.cart))
    } else {
      if (elem[0].left <= elem[0].count) {
        return
      }
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i].article === payload.article) {
          console.log(state.cart[i])
          state.cart[i].count++
          localStorage.setItem('cart', JSON.stringify(state.cart))
          break
        }
      }
    }
    state.count_items++
    localStorage.setItem('count_items', JSON.stringify(state.count_items))
    state.cart = state.cart.sort()
  },
  DELETE_FROM_CART(state, payload) {
    const elem = state.cart.filter((item) => payload.article === item.article)
    state.count_items--
    localStorage.setItem('count_items', JSON.stringify(state.count_items))

    if (elem[0].count > 1) {
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i].article === payload.article) {
          state.cart[i].count--
          break
        }
      }
    } else {
      state.cart = state.cart.filter((item) => payload.article !== item.article)
      localStorage.setItem('cart', JSON.stringify(state.cart))
      return
    }
    state.cart = state.cart.sort()
    localStorage.setItem('cart', JSON.stringify(state.cart))
  },
  STORAGE_TO_STORE(state, pay) {
    console.log(pay)
    state.login = localStorage.getItem('username')
    state.cart = JSON.parse(localStorage.getItem('cart')) || []
    state.count_items = localStorage.getItem('count_items') || 0
    state.token = localStorage.getItem('user-token')
    if (state.token) {
      axios.defaults.headers.common.Authorization =
        'Bearer ' + localStorage.getItem('user-token')
    }
  },
}
