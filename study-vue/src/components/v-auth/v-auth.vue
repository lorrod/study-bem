<template>
  <div class='v-auth-login-modal'>
    <template v-if="showLogin === true">
      <!-- key указан, но перерендер  ?? -->
      <vLogin
        key="login-form"
        @registerPage="registerPage"/>
    </template>
    <template v-else>
      <vRegister
        key="register-form"
        @loginPage="loginPage"/>
    </template>
  </div>
</template>


<script>
import vLogin from "./v-auth-login.vue";
import vRegister from "./v-auth-register.vue";

export default {
  name: "vAuth",
  data() {
    return {
      showLogin: true
    }
  },
  components: {
    vLogin,
    vRegister
  },
  methods: {
    registerPage() {
      console.log("false");
      this.showLogin = false;
      console.log("false");
    },
    loginPage() {

      console.log("tfalse");
      this.showLogin = true;
      console.log("true");
    }
  }
};
</script>


<style>
  .v-auth-login-modal {
    width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
</style>
