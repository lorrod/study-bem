export default {
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
  POSTED(state) {
    state.status = "order-posted";
    //state.hasLoadedOnce = true;
  },
  GET_ERROR(state) {
    state.status = "error";
    //state.hasLoadedOnce = true;
  },
  ADD_TO_CART(state , payload) {
    var elem = state.cart.filter( item => payload.article === item.article);

    if (elem.length == 0) {
      payload.count = 1;
      state.cart.push(payload);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    } else {
      if (elem[0].left <= elem[0].count) {
        return
        }
        for (var i = 0; i<state.cart.length; i++) {
          if (state.cart[i].article === payload.article) {
            console.log(state.cart[i]);
            state.cart[i].count++;
            localStorage.setItem("cart", JSON.stringify(state.cart));
            break;
          }
        }
      }
      state.count_items++;
      localStorage.setItem("count_items", JSON.stringify(state.count_items));
      state.cart = state.cart.sort();
    },
  DELETE_FROM_CART(state, payload) {
    var elem = state.cart.filter( item => payload.article === item.article);
    state.count_items--;
    localStorage.setItem("count_items", JSON.stringify(state.count_items));

    if (elem[0].count > 1) {
      for (var i = 0; i<state.cart.length; i++) {
        if (state.cart[i].article === payload.article) {
          state.cart[i].count--;
          break;
        }
      }
    } else {
      state.cart = state.cart.filter( item => payload.article !== item.article);
      localStorage.setItem("cart", JSON.stringify(state.cart));
      return
    }
    state.cart = state.cart.sort();
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }
}
