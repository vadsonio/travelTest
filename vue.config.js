module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/sass/main.scss";`
      }
    }
  },
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/travelTest/dist'
    : '/'
}