import axios from 'axios'
import router from '../../router'

export default {
  REGISTER_REQUEST({ commit }, user) {
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
          //dispatch("USER_REQUEST");
          resolve(resp);
        })
        .catch(error => {
          commit("AUTH_ERROR", error);
          localStorage.removeItem("user-token");
          reject(error.response);
          console.log(error.response);
        });
    });
  },
  AUTH_REQUEST({ commit }, user) {
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
          //dispatch("USER_REQUEST");
          resolve(resp);
        })
        .catch(err => {
          commit("AUTH_ERROR", err);
          localStorage.removeItem("user-token");
          reject(err.response);
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
    return new Promise((resolve, reject) => {
      axios("http://localhost:5000/products",{
        method: "GET"
      })
        .then((products) => {
          commit('SET_PRODUCTS_TO_STATE', products.data);
          resolve(products);
        })
        .catch((error) => {
          reject(error);
        })
    });
  },
  GET_PRODUCT_FROM_API({ commit, dispatch }, id){
    return new Promise((resolve, reject) => {
      var elem = this.state.cart.filter( item => id === item.article);
      if (elem.length != 0) {
          resolve(elem[0]);
      }
      axios("http://localhost:5000/products?article="+id,{
        method: "GET"
      })
        .then((product) => {
          //commit('SET_PRODUCT_TO_STATE', product.data);
          resolve(product.data[0]);
        })
        .catch((error) => {
          if (error.response.status == 401) {
            commit("GET_ERROR", error);
            router.push('/Auth');
            dispatch('AUTH_LOGOUT');
          }
          console.log(error);
          reject();
        })
    });
  },
  POST_ORDER({ commit, dispatch }, userdata) {
    return new Promise((resolve, reject) => {
      commit("USER_ORDER");
      axios("http://localhost:5000/order",{
        data: userdata,
        method: "POST"
      })
        .then(() => {
          commit('POSTED');
          localStorage.removeItem("cart");
          localStorage.removeItem("count_items");
          resolve();
        })
        .catch((error) => {
          if (error.response.status == 401) {
            commit("GET_ERROR", error);
            router.push('/Auth');
            dispatch('AUTH_LOGOUT');
          }
          reject(error);
        })
    })
  },
  GET_RECENT_ADDRESSES() {
    return new Promise((resolve) => {
      var recent_addresses = {'name':'Pavel Mulin',
                              'street': 'Babushkina 84',
                              'city':'Saint-Petersburg',
                              'country': 'Russia',
                              'zip': '188480'}
      resolve(recent_addresses)
    })
  }
}
