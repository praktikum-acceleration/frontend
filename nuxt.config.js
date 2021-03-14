export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang: 'ru',
    },
    title: 'Программа акселерации',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      {lang: 'ru'}
    ],


    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  ssr: false,
  env: {
    baseUrl: 'http://127.0.0.1:8000/',
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/css/main.scss',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [

  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
  ],
  styleResources: {
    scss: [
      '~/assets/css/vars.scss', // путь к вашему файлу
    ],
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
