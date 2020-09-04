export default {
  PRODUCTS(state) {
    return (state) => state.products
  },
  isAuthenticated(state) {
    if (state.token === '') {
      return false
    }
    return true
  },
  getLogin(state) {
    return (state) => state.login
  },
  authStatus(state) {
    return (state) => state.status
  },
}
