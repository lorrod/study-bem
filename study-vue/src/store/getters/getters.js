export default {
  PRODUCTS(state) {
    return state.products
  },
    isAuthenticated: state => !!state.token,
    getLogin: state => state.login,
    authStatus: state => state.status
}
