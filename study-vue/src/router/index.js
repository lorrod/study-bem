import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Cart from "../views/Cart.vue";
import Item from "../views/Item.vue";
import Auth from "../views/Auth.vue";
import Cabinet from "../views/Cabinet.vue";
import Leaderboard from "../views/Leaderboard.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart
  },
  {
    path: "/item/:id",
    name: "Item",
    component: Item,
    props: true
  },
  {
    path: "/Auth",
    name: "Auth",
    component: Auth
  },
  {
    path: "/cabinet",
    name: "Cabinet",
    component: Cabinet
  },
  {
    path: "/leaderboard",
    name: "Leaderboard",
    component: Leaderboard
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
