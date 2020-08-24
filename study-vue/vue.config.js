module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/assets/styles/style.scss";`
      }
    },
  },
  transpileDependencies: ["vuetify"]
};
