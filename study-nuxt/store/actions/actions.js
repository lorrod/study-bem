import axios from 'axios'

export default {
  REGISTER_REQUEST({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit('REGISTER_REQUEST')
      axios({
        url: 'http://35.228.180.216:8443/register',
        data: user,
        method: 'POST',
      })
        .then((resp) => {
          axios.defaults.headers.common.Authorization =
            'Bearer ' + resp.data.token
          commit('AUTH_SUCCESS', resp)
          // dispatch("USER_REQUEST");
          resolve(resp)
        })
        .catch((error) => {
          commit('AUTH_ERROR', error)
          reject(error.response)
          console.log(error.response)
        })
    })
  },
  AUTH_REQUEST({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit('AUTH_REQUEST')
      axios({ url: 'http://35.228.180.216:8443/login', data: user, method: 'POST' })
        .then((resp) => {
          axios.defaults.headers.common.Authorization =
            'Bearer ' + resp.data.token
          commit('AUTH_SUCCESS', resp)
          // dispatch("USER_REQUEST");
          resolve(resp)
        })
        .catch((err) => {
          commit('AUTH_ERROR', err)
          reject(err.response)
        })
    })
  },
  AUTH_LOGOUT({ commit }) {
    return new Promise((resolve) => {
      commit('AUTH_LOGOUT')
      resolve()
    })
  },
  GET_PRODUCTS_FROM_API({ commit }) {
    return new Promise((resolve, reject) => {
      axios('http://35.228.180.216:8443/products', {
        method: 'GET',
      })
        .then((products) => {
          commit('SET_PRODUCTS_TO_STATE', products.data)
          resolve(products)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  GET_PRODUCT_FROM_API({ commit, dispatch }, id) {
    return new Promise((resolve, reject) => {
      const elem = this.state.cart.filter((item) => id === item.article)
      if (elem.length !== 0) {
        resolve(elem[0])
      }
      axios('http://35.228.180.216:8443/products?article=' + id, {
        method: 'GET',
      })
        .then((product) => {
          // commit('SET_PRODUCT_TO_STATE', product.data)
          resolve(product.data[0])
        })
        .catch((error) => {
          if (error.response.status === 401 || error.response.status === 422) {
            commit('GET_ERROR', error)
            this.$router.push('/Auth')
            dispatch('AUTH_LOGOUT')
          }
          console.log(error)
          reject(error)
        })
    })
  },
  POST_ORDER({ commit, dispatch }, userdata) {
    return new Promise((resolve, reject) => {
      userdata.item = JSON.parse(localStorage.getItem('cart'))
      axios('http://35.228.180.216:8443/order', {
        data: userdata,
        method: 'POST',
      })
        .then(() => {
          commit('POSTED') // push to payment page
          resolve()
        })
        .catch((error) => {
          if (error.response.status === 401 || error.response.status === 422) {
            commit('GET_ERROR', error)
            this.$router.push('/Auth')
            dispatch('AUTH_LOGOUT')
          }
          reject(error)
        })
    })
  },
  GET_RECENT_ADDRESSES({ commit, dispatch }) {
    return new Promise((resolve) => {
      axios('http://35.228.180.216:8443/get-recent-address', {
        method: 'GET',
      })
        .then((address) => {
          console.log(address)
          resolve(address.data)
        })
        .catch((error) => {
          if (error.response.status === 401 || error.response.status === 422) {
            commit('GET_ERROR', error)
            this.$router.push('/Auth')
            dispatch('AUTH_LOGOUT')
          } else if (error.response.status === 404) {
            resolve({ name: '', street: '', city: '', country: '', zip: '' })
          }
        })
    })
  },
}
