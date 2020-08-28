<template>
  <div class='v-auth-register-modal'>
    <v-dialog
          class="v-auth-register-modal__body"
          v-model="modalRegister"
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
          </v-card-actions>
        </form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
//import vLogin from "./v-auth-login";

export default {
  name: "vRegister",
  data() {
    return {
      modalRegister: false,
      username: "",
      password: "",
      rep_password: "",
      wrong_msg: ""
    };
  },
  props: {
    button_name: {
      type: String,
      default() {
        return "Register"
      }
    }
  },
  methods: {
    register: function() {
      const { username, password } = this;
      this.$store.dispatch("REGISTER_REQUEST", { username, password }).then(() => {
        this.modalRegister = false;
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
      &__btn {
        margin-right:$header-margin;
        margin-left:$header-margin;
      }
      &__wrong-msg {
        color: red;
        font-size: 12px;
      }
    }
</style>
