<template>
  <div class='v-auth-login-modal'>
  <v-dialog
        class="v-auth-login-modal__body"
        v-model="modalLogin"
        dark
        width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="v-auth-login-modal__btn"
        color="primary"
        v-bind="attrs"
        dark
        v-on="on"
      >
        {{ button_name }}
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Log in</span>
      </v-card-title>
      <v-card-text>
        <form class="login" @submit.prevent="login">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Username"
                  persistent-hint
                  required
                  v-model="username"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password"
                  persistent-hint
                  required
                  v-model="password"
                  type="password"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-btn
              type="submit"
              text>Login</v-btn>
          </v-card-actions>
        </form>
        </v-card-text>
      </v-card>
    </v-dialog>
    </div>
</template>


<script>
//import vRegister from "./v-auth-register.vue";

export default {
  name: "vLogin",
  data() {
    return {
      modalLogin: false,
      username: "",
      password: ""
    };
  },
  props: {
    button_name: {
      type: String,
      default() {
        return "Login"
      }
    }
  },
  methods: {
    login: function() {
      const { username, password } = this;
      this.$store.dispatch("AUTH_REQUEST", { username, password }).then(() => {
        this.modalLogin = false;
      });
    }
  }
};
</script>


<style lang="scss">
  .v-auth-login-modal {
    &__btn {
      margin-right:$header-margin;
      margin-left:$header-margin;
    }
  }
</style>
