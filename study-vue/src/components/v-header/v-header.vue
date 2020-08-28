<template>
  <div class='v-header'>
    <div class="v-header__links">
      <router-link
        class="v-header__links-link"
        to="/"><p v-if="windowWidth > 800">Home</p><v-icon>mdi-home</v-icon></router-link> |
      <router-link
        class="v-header__links-link"
        to="/about"><p v-if="windowWidth > 800">About</p><v-icon>mdi-information</v-icon></router-link> |
      <router-link
        class="v-header__links-link"
        to="/leaderboard"><p v-if="windowWidth > 800">Leaderboard</p><v-icon>mdi-equalizer</v-icon></router-link> |
      <router-link
        class="v-header__links-link"
        to="/cart"><p v-if="windowWidth > 800">Cart</p><v-icon>mdi-cart</v-icon>: {{ this.$store.state.count_items }}</router-link>
    </div>


    <div class="v-header__auth-container" data-app>
      <vHeaderMenu
        :nickname="this.$store.state.login"
        @toHeader="fromMenu"
        v-if="isAuthenticated"/>
      <vAuthRegister
        v-if="!isAuthenticated"/>
      <vAuthLogin
        v-if="!isAuthenticated"/>
    </div>
  </div>
</template>


<script>
//import vAuth from '../v-auth/v-auth.vue'
import vAuthLogin from '../v-auth/v-auth-login.vue'
import vAuthRegister from '../v-auth/v-auth-register.vue'
import vHeaderMenu from './v-header-menu.vue'
import { mapGetters } from "vuex";

export default {
  name: "navigation",
  components: {
    vAuthLogin,
    vAuthRegister,
    vHeaderMenu
  },
  data: function () {
    return {
      windowWidth: window.innerWidth,
      show_auth: false
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("AUTH_LOGOUT").then(() => this.$router.push("/"));
    },
    login: function() {
      //this.$router.push("/auth")
      this.show_auth = true;
    },
    cabinet: function() {
      this.$router.push("/cabinet");
    },
    fromMenu: function(arg) {
      if (arg.title == "Logout") {
        this.$store.dispatch("AUTH_LOGOUT").then(() => this.$router.push("/"));
      } else if (arg.title == "Profile") {
        this.$router.push("/cabinet");
      } else if (arg.title == "Tickets") {
        this.$router.push("/tickets");
      }
    },
    onResize() {
      this.windowHeight = window.innerHeight
    }
  },
  computed: {
    ...mapGetters([ "isAuthenticated", "getLogin" ]),
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
};


</script>

<style lang="scss">

.v-header {
  display:flex;
  justify-content:center;
  align-items: center;
  padding: 30px;

  &__links {
    flex:1;
    display: flex;
    justify-content: center;
    transform: translateX(10px);
    font-weight: bold;
    color: #2c3e50;
    &-link{
      display: flex;
      flex-direction:row;
      align-items: center;
      margin-right:$header-margin;
      margin-left:$header-margin;
      color: #2c3e50;
      text-decoration: none;
      &.router-link-exact-active {
        color: #42b983;
      }
    }

  }
  &__auth-container {
    display: flex;
    flex-direction: row;
  }
}
</style>
