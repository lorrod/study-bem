<template>
  <div class="v-auth-register-modal">
    <v-dialog
      v-model="modalRegister"
      class="v-auth-register-modal__body"
      dark
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="v-auth-register-modal__btn"
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
          <form class="register" @submit.prevent="register">
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
                <v-col cols="12">
                  <v-text-field
                    v-model="rep_password"
                    label="Repeat password"
                    persistent-hint
                    required
                    type="password"
                  ></v-text-field>
                  <small class="v-auth-register-modal__wrong-msg">{{
                    wrong_msg
                  }}</small>
                </v-col>
              </v-row>
            </v-container>
            <v-card-actions>
              <v-btn type="submit" text>Register</v-btn>
            </v-card-actions>
          </form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'VRegister',
  props: {
    button_name: {
      type: String,
      default() {
        return 'Register'
      },
    },
  },
  data() {
    return {
      modalRegister: false,
      username: '',
      password: '',
      rep_password: '',
      wrong_msg: '',
    }
  },
  watch: {
    rep_password() {
      if (this.rep_password !== this.password) {
        this.wrong_msg = "Passwords doesn't match"
      } else {
        this.wrong_msg = ''
      }
    },
  },
  methods: {
    register() {
      const { username, password } = this
      this.$store
        .dispatch('REGISTER_REQUEST', { username, password })
        .then(() => {
          this.modalRegister = false
          this.$router.back()
        })
        .catch((error) => {
          this.wrong_msg = error.data.msg
        })
    },
    switchTo(page) {
      this.$emit(page)
    },
  },
}
</script>

<style lang="scss">
.v-auth-register-modal {
  &__btn {
    margin-right: $header-margin;
    margin-left: $header-margin;
  }
  &__wrong-msg {
    color: red;
    font-size: 12px;
  }
}
</style>
