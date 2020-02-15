module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/sass/main.scss";`
      }
    }
  },
  lintOnSave: false,
  devServer: {
    proxy: 'https://namaztimes.kz/',
  }
}