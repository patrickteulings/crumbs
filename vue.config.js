// Inside vue.config.js
module.exports = {
  // ...other vue-cli plugin options...
  pwa: {
    name: 'My App',
    themeColor: '#ffffff',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    manifestOptions: {
      display: 'portrait',
      bacgroundColor: '#ffffff'
    },
    appleMobileWebAppStatusBarStyle: 'black',
  }
}