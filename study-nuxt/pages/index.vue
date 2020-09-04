<template>
  <div class="text-center">
    <logo />
    <vuetify-logo />
    <inspire />
  </div>
</template>

<script>
import Logo from '~/components/v-default/v-default__logo.vue'
import VuetifyLogo from '~/components/v-default/v-default__vuetifyLogo.vue'
import Inspire from '~/components/v-default/v-default__inspire.vue'

export default {
  components: {
    Logo,
    VuetifyLogo,
    Inspire,
  },
}
</script>
