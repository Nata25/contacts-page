module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Contacts',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Contacts Page (Nuxt.js sample project)' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },
  css: [
    '~/assets/styles/styles.sass',
  ],
  modules: ['nuxt-google-maps-module'],
  maps: {
    key: 'AIzaSyDjMi01Vt9USgtdF0ZLlmrbzniQpiUI0Ho'
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

