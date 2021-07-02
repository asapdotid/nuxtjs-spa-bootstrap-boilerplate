export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Boilerplate',
    titleTemplate: '%s - Nuxt Js',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/bootstrap.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/bootstrap.js', mode: 'client' }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://www.npmjs.com/package/@nuxtjs/fontawesome
    '@nuxtjs/fontawesome',
    // https://www.npmjs.com/package/@aceforth/nuxt-optimized-images
    '@aceforth/nuxt-optimized-images',
  ],

  // Fontawesome module configuration
  fontawesome: {
    component: 'fa',
    icons: {
      solid: ['faHome', 'faHeart', 'faAppleAlt'],

      // include all icons. But dont do this.
      // solid: true,
      // brands: true,
      // regular: true,
    },
  },

  // OptimizedImages module configuration
  optimizedImages: {
    optimizeImages: true,
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://www.npmjs.com/package/@nuxtjs/style-resources
    '@nuxtjs/style-resources',
    // https://www.npmjs.com/package/nuxt-webfontloader
    'nuxt-webfontloader',
    // https://sitemap.nuxtjs.org/
    '@nuxtjs/sitemap',
    // https://github.com/nuxt-community/robots-module
    '@nuxtjs/robots',
    // https://github.com/dansmaculotte/nuxt-security
    '@dansmaculotte/nuxt-security',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    https: `${process.env.NODE_ENV}` !== 'development',
    baseURL: `${process.env.API_URL}`,
  },

  // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-runtime-config/
  publicRuntimeConfig: {
    appURL: `${process.env.APP_URL}`,
  },

  // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-runtime-config/
  privateRuntimeConfig: {},

  // Style Resource module configuration
  styleResources: {
    scss: [
      './assets/scss/vars/*.scss',
      './assets/scss/abstracts/_mixins.scss', // use underscore "_" & also file extension ".scss"
      './assets/scss/main.scss',
    ],
  },

  // Web Font Loader module configuration
  webfontloader: {
    google: {
      families: [
        'Quicksand:300,400,600,700',
        'Fredoka One:400',
        'Baloo Chettan 2:500,600,700',
      ],
    },
  },

  // Sitemap module configuration
  sitemap: {
    hostname: process.env.APP_URL,
    gzip: true,
  },

  // Robots module configuration
  robots: {
    UserAgent: '*',
    Disallow: '/',
  },

  // Security module configuration
  security: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-server
  server: {
    host: `${process.env.SERVER_HOST}`, // default: localhost
    port: process.env.SERVER_PORT, // default: 3000
    timing: false,
  },

  // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-cli
  cli: {
    badgeMessages: [`Application running on ${process.env.APP_MODE}`],
  },

  // Telemetry disable (https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-telemetry/)
  telemetry: false,

  // Modifying the loading indicator for spa  - https://nuxtjs.org/docs/2.x/features/loading
  loadingIndicator: {
    name: 'chasing-dots',
    color: '#158876',
    background: '#f3f5f4',
  },

  // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-transition#the-layouttransition-property
  layoutTransition: {
    name: 'layout',
    mode: 'out-in',
  },

  // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-transition#the-layouttransition-property
  pageTransition: {
    name: 'page',
    mode: 'out-in',
  },

  // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-watchers (support for WSL)
  watchers: {
    webpack: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  },
}
