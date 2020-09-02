<template lang="html">
  <div class="Auth">
    <vAuth />
    <vRegister />
  </div>
</template>




<script>
import vAuth from '../components/v-auth/v-auth-login.vue'
import vRegister from '../components/v-auth/v-auth-register.vue'

export default {
  name: "Auth",
  components: {
    vAuth,
    vRegister
  }
}

</script>

<style lang="scss">
</style>
