<template lang="html">
  <div class="Auth">
    <div class="Auth__buttons">
      <vAuth />
      <vRegister />
    </div>
  </div>
</template>

<script>
import vAuth from '@/components/v-auth/v-auth-login.vue'
import vRegister from '@/components/v-auth/v-auth-register.vue'

export default {
  name: 'Auth',
  components: {
    vAuth,
    vRegister,
  },
}
</script>

<style lang="scss">
.Auth {
  &__buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
}
</style>
