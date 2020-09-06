<template>
  <div class="v-header">
    <div class="v-header__links">
      <nuxt-link class="v-header__links-link" to="/home"
        >Home
        <v-icon class="v-header__links-link__icon">mdi-home</v-icon>
      </nuxt-link>
      |
      <nuxt-link class="v-header__links-link" to="/about"
        >About
        <v-icon class="v-header__links-link__icon">mdi-information</v-icon>
      </nuxt-link>
      |
      <nuxt-link class="v-header__links-link" to="/leaderboard"
        >Leaderboard
        <v-icon class="v-header__links-link__icon">mdi-equalizer</v-icon>
      </nuxt-link>
      |
      <nuxt-link class="v-header__links-link" to="/cart"
        >Cart
        <v-icon class="v-header__links-link__icon">mdi-cart</v-icon>
        :{{ this.$store.state.count_items }}</nuxt-link
      >
    </div>

    <div
      v-if="this.$route.path != '/Auth'"
      class="v-header__auth-container"
      data-app
    >
      <vHeaderMenu v-if="this.$store.state.login" @toHeader="fromMenu" />
      <vAuthRegister v-if="!this.$store.state.login" />
      <vAuthLogin v-if="!this.$store.state.login" />
    </div>
  </div>
</template>

<script>
// import vAuth from '../v-auth/v-auth.vue'
import { mapGetters, mapMutations } from 'vuex'
import vAuthLogin from '../v-auth/v-auth-login.vue'
import vAuthRegister from '../v-auth/v-auth-register.vue'
import vHeaderMenu from './v-header-menu.vue'

export default {
  name: 'Navigation',
  components: {
    vAuthLogin,
    vAuthRegister,
    vHeaderMenu,
  },
  data() {
    return {
      show_auth: false,
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'getLogin']),
  },
  methods: {
    ...mapMutations(['STORAGE_TO_STORE']),
    logout() {
      this.$store.dispatch('AUTH_LOGOUT').then(() => this.$router.push('/'))
    },
    login() {
      // this.$router.push("/auth")
      this.show_auth = true
    },
    cabinet() {
      this.$router.push('/cabinet')
    },
    fromMenu(arg) {
      if (arg.title === 'Logout') {
        this.$store.dispatch('AUTH_LOGOUT').then(() => this.$router.push('/'))
      } else if (arg.title === 'Profile') {
        this.$router.push('/cabinet')
      } else if (arg.title === 'Tickets') {
        this.$router.push('/tickets')
      }
    },
    initData() {
      this.STORAGE_TO_STORE('var')
    },
  },
  mounted() {
    this.initData()
  },
}
</script>

<style lang="scss">
.v-header {
  display: flex;
  padding: 30px;

  &__links {
    flex: 1;
    display: flex;
    transform: translateX(10px);
    font-weight: bold;
    justify-content: center;
    color: #2c3e50;
    &-link {
      display: flex;
      flex-direction: row;
      margin-right: $header-margin;
      margin-left: $header-margin;
      color: #2c3e50;
      text-decoration: none;
      &.nuxt-link-exact-active {
        color: #42b983;
      }
      &__icon {
        vertical-align: middle;
      }
    }
  }
  &__auth-container {
    display: flex;
    flex-direction: row;
  }
}
</style>
