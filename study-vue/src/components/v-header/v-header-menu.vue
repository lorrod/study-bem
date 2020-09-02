<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on">
          Hello, {{ $store.state.login }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="menuTarget(item)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "vHeaderMenu",
  data: function() {
    return {
      items: [
          {
            title: 'Profile',
          },
          {
            title: 'Tickets',
          },
          {
            title: 'Logout',
          },
        ],
    }
  },
  methods: {
    menuTarget(action) {
      this.$emit("toHeader",action);
    }
  }

}
</script>

<style lang="scss">

</style>
