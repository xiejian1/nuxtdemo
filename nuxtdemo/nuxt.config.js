module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'nuxt框架基础学习' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
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
    },
    vendor: ['axios', 'element-ui','moment']
  },
  // plugin config
  plugins: [
    { src: '~plugins/nuxt-element-plugin.js' },
    { src: '~plugins/nuxt-axios-plugin.js' },
    { src: '~plugins/nuxt-moment-plugin.js' }
  ],
  css: [
    /*'minireset.css/minireset.css',*/
    // 'wangeditor/release/wangEditor.css',
    'element-ui/lib/theme-chalk/index.css',
    '~assets/style/common.css'
  ],
}

