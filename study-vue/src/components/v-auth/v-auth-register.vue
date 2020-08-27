<template>
  <div class='v-auth-login-modal'>

    <v-card>
      <v-card-title>
        <span class="headline">Create an Account</span>
      </v-card-title>
      <v-card-text>
        <form class="login" @submit.prevent="register">
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
              <v-col cols="12">
                <v-text-field
                  label="Repeat password"
                  persistent-hint
                  required
                  v-model="rep_password"
                  type="password"
                ></v-text-field>
                <small class="v-auth-login-modal__wrong-msg">{{ wrong_msg }}</small>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-btn
              type="submit"
              text>Register</v-btn>
            <v-btn
              @click="switchTo('loginPage')"
              text>Already registered?</v-btn>
          </v-card-actions>
        </form>
        </v-card-text>
      </v-card>
    </div>
</template>


<script>
//import { AUTH_REQUEST } from "actions/auth";

export default {
  name: "vRegister",
  data() {
    return {
      username: "",
      password: "",
      rep_password: "",
      wrong_msg: ""
    };
  },
  methods: {
    register: function() {
      const { username, password } = this;
      this.$store.dispatch("REGISTER_REQUEST", { username, password }).then(() => {
        this.$router.push("/");
      });
    },
    switchTo(page) {
      this.$emit(page);
    }
  },
  watch: {
    rep_password: function() {
      if (this.rep_password !== this.password) {
        console.log(this.wrong_msg);
        console.log("should chandge");
        this.wrong_msg = "Passwords doesn't match";
      } else {
        this.wrong_msg = "";
      }
    }
  }
};
</script>


<style lang="scss">
  .v-auth-login-modal {
    width: 600px;
    margin-left: auto;
    margin-right: auto;
    &__wrong-msg {
      color: red;
      font-size: 12px;
    }
  }
</style>
