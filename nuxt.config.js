export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-pns',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },


  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/tailwindcss', // Tailwind CSS untuk Nuxt 2
  ],
  css: [
    // '@/assets/css/tailwind.css',  // Jika Anda punya file custom tailwind.css
  ],

  router: {
    middleware: ['auth']  // Pastikan ada koma di sini jika ada properti lain setelahnya
  },

  modules: ['@nuxtjs/axios', 'cookie-universal-nuxt'],
  axios: {
    baseURL: 'http://127.0.0.1:8000/api', // ganti dengan URL API Laravel kamu
    credentials: true,
  },

  

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true,
    },
  }
}
