<template>
  <div class="v-auth-login-modal">
    <v-row justify="center">
      <v-dialog v-model="openAuthModal" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <button class="v-auth-login-modal__open-btn" v-bind="attrs" v-on="on">
            Login
          </button>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Sign in.</span>
          </v-card-title>
          <v-card-text>
            <form class="login" @submit.prevent="login">
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="username"
                      label="Username"
                      persistent-hint
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="password"
                      label="Password"
                      persistent-hint
                      required
                      type="password"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <v-card-actions>
                <v-btn text @click="toParent('send-usr-data')">Pay</v-btn>
                <v-btn type="submit" text>Login</v-btn>
              </v-card-actions>
            </form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
// import { AUTH_REQUEST } from "actions/auth";

export default {
  name: 'Login',
  data() {
    return {
      openAuthModal: false,
      username: 'dogo',
      password: 'dogy',
    }
  },
  methods: {
    login() {
      const { username, password } = this
      this.$store.dispatch('AUTH_REQUEST', { username, password }).then(() => {
        this.$router.push('/')
      })
    },
  },
}
</script>

<style>
.login {
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 10px;
}
</style>
