<template>
  <div class='v-auth-login-modal'>

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
            <v-btn
              @click="switchTo('registerPage')"
              text>Have no account?</v-btn>
          </v-card-actions>
        </form>
        </v-card-text>
      </v-card>
    </div>
</template>


<script>
//import { AUTH_REQUEST } from "actions/auth";

export default {
  name: "vLogin",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login: function() {
      const { username, password } = this;
      this.$store.dispatch("AUTH_REQUEST", { username, password }).then(() => {
        this.$router.push("/");
      });
    },
    switchTo(page) {
      this.$emit(page);
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
