# Nuxt JS Boilerplate Application for Version `2.*.*` + Boostrap CSS `5`

Setup boilerplate application for development, staging and production with some modules:

> Using `Yarn` package manager

- PM2 global installation on host
- RimRaf
- Nuxt-Start for `staging` & `production` with PM2
- Runtime Config
- Boostrap CSS (version 5)
- Style Resource (SASS)
- Web font loader (Google font)
- Sitemap
- Security
- Robots
- Font Awesome
- Image Optimizer (jpg, png, gif, svg & webp)

> Note: All Modules install in `dependencies` not in `devDependencies`, due to deploy application with CI/CD & Docker

## Prepare application config files for Development, Staging & Production

- Development Environment `(.env.development)`

```bash
# MASTER CONFIG
# DEVELOPMENT ENVIRONMENT
APP_MODE=Development
NODE_ENV=development
SERVER_HOST=0.0.0.0
SERVER_PORT=3000
APP_URL=http://localhost:3000
API_URL=https://api.nuxtjs.dev
```

- Staging Environment `(.env.staging)`

```bash
# MASTER CONFIG
# STAGING ENVIRONMENT
APP_MODE="Staging"
NODE_ENV="production"
SERVER_HOST=0.0.0.0
SERVER_PORT=3000
APP_URL=https://staging-domain.com:8080
API_URL=https://api.nuxtjs.dev
```

- Production Environment `(.env.production)`

```bash
# MASTER CONFIG
# PRODUCTION ENVIRONMENT
APP_MODE="Production"
NODE_ENV="production"
SERVER_HOST=0.0.0.0
SERVER_PORT=3000
APP_URL=https://production-domain.com
API_URL=https://api.nuxtjs.dev
```

> You can custom all config value with your own config. And set up your key env to the Nuxt config and nuxt/vue files

How to use on Nuxt Config `(nuxt.config.js)`, like use dotenv module:

> process.env.APP_URL

```bash
...
  axios: {
    https: `${process.env.NODE_ENV}` !== 'development',
    baseURL: `${process.env.API_URL}`,
  },

  server: {
    host: `${process.env.SERVER_HOST}`, // default: localhost
    port: process.env.SERVER_PORT, // default: 3000
    timing: false,
  },

  cli: {
    badgeMessages: [`Application running on ${process.env.APP_MODE}`],
  },

  publicRuntimeConfig: {
    appURL: `${process.env.APP_URL}`,
  },

  privateRuntimeConfig: {
  },
```

How to use on part of _**Nuxt/Vue files**_ with **Public Runtime Config** or **Private Runtime Config** in `nuxt.config.js`

Sample in Pages/index.vue

```bash
<template>
  <div>
    <p>APP url: {{ appURL }} || API url: {{ $config.apiURL }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      appURL: this.$config.appURL
    }
  }
}
</script>
```

---

## Production Setup (Nuxt-Start + RimRaf + PM2)

- Documentation for Nuxt-Start [here](https://www.npmjs.com/package/nuxt-start)
- Documentation for RimRaf [here](https://www.npmjs.com/package/rimraf)
- Documentation for PM2 [here](https://pm2.keymetrics.io/)

Installation for Nuxt-Start:

```bash
using yarn:

yarn add nuxt-start
```

Installation for RimRaf:

```bash
using yarn:

yarn add rimraf
```

Installation for PM2 for Global installation:

```bash
using yarn:

yarn add pm2 -g
```

PM2 ecosystem config `ecosystem.config.js`:

```bash
module.exports = {
  apps: [
    {
      name: 'staging-app',
      exec_mode: 'cluster',
      instances: 2,
      script: 'nuxt-start',
      args: '--dotenv .env.staging',
      watch: true,
      out_file: '/dev/null',
      error_file: '/dev/null',
      env: {
        HOST: '0.0.0.0',
        PORT: 3000,
        NODE_ENV: 'production',
      },
    },
    {
      name: 'production-app',
      exec_mode: 'cluster',
      instances: 2,
      script: 'nuxt-start',
      args: '--dotenv .env.production',
      watch: true,
      out_file: '/dev/null',
      error_file: '/dev/null',
      env: {
        HOST: '0.0.0.0',
        PORT: 3000,
        NODE_ENV: 'production',
      },
    },
  ],
}
```

Finally modify `package.json` script:

```bash
...
"scripts": {
  "test": "jest",
    "clean": "rimraf .nuxt && rimraf dist",
    "dev": "nuxt --dotenv .env.development",
    "build:dev": "yarn clean && nuxt build --dotenv .env.development",
    "start:dev": "nuxt start --dotenv .env.development",
    "generate:dev": "nuxt generate --dotenv .env.development",
    "build:staging": "yarn clean && nuxt build --dotenv .env.staging",
    "start:staging": "pm2 start ecosystem.config.js --only staging-app",
    "reload:staging": "pm2 reload ecosystem.config.js --only staging-app",
    "stop:staging": "pm2 stop ecosystem.config.js --only staging-app",
    "delete:staging": "yarn stop:staging && pm2 delete ecosystem.config.js --only staging-app",
    "build:production": "yarn clean && nuxt build --dotenv .env.production",
    "start:production": "pm2 start ecosystem.config.js --only production-app",
    "reload:production": "pm2 reload ecosystem.config.js --only production-app",
    "stop:production": "pm2 stop ecosystem.config.js --only production-app",
    "delete:production": "yarn stop:production && pm2 delete ecosystem.config.js --only production-app"
},
```

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at development
$ yarn dev

# build for development and launch server LOCAL
$ yarn build:dev
$ yarn start:dev

# build for staging and launch server use PM2
$ yarn build:staging
$ yarn start:staging
$ yarn stop:staging
$ yarn reload:staging
$ yarn delete:staging

# build for production and launch server use PM2
$ yarn build:production
$ yarn start:production
$ yarn stop:production
$ yarn reload:production
$ yarn delete:production

# generate static project
$ yarn generate:dev
```

---

# Setup Modules

## 1. Bootstrap 5 integration

Install Packages for Bootstrap configuration (SCSS support)

```bash
yarn add bootstrap @popperjs/core sass sass-loader@10 fibers
```

Setup configuration:

1. Next in the assets folder I created a `scss` folder with a `main.scss` file inside. In this file you can import bootstrap css.

```bash
@import "~bootstrap";
```

Then in the nuxt.config.js I added this:

```bash
css: [
    '~/assets/scss/main.scss'
],
```

2. In the `plugins` folder, just create a file named `bootstrap.js` Just add an import inside:

```bash
import bootstrap from 'bootstrap'
```

Then in your nuxt.config.js:

```bash
plugins: [
    {src: '~/plugins/bootstrap.js', mode: 'client'}
],
```

## 2. Style Resources Module (SASS)

Using a configuration file for global variables in Nuxt is very simple, it just takes some steps to follow

Step 1: Add sass-loader and node-sass to your project

```bash
using yarn:

yarn add node-sass sass-loader
```

Step 2: Adding the plugin style-resources to your project. If you don't know about plugins take a look in [NuxtJS documentation](https://nuxtjs.org/guide/plugins/). Also you can review the mentioned plugin [right here](https://github.com/nuxt-community/style-resources-module).

```bash
using yarn:

yarn add @nuxtjs/style-resources
```

Step 3: Adding to your assets directory a new sccs directory (this is where your global variable files will be stored, you can use as much as you like)

```bash
./assets/scss/vars/colors.scss
./assets/scss/abstracts/_mixins.scss
./assets/scss/main.scss
```

Step 4: Modify your `nuxt.config.js` file to map the new styles

```bash
modules: [
  '@nuxtjs/style-resources',
],

styleResources: {
    scss: [
    './assets/scss/vars/*.scss',
    './assets/scss/abstracts/_mixins.scss', // use underscore "_" & also file extension ".scss"
    './assets/scss/main.scss',
    ]
},
```

## 3. Webfontloader Module (Google Fonts)

Documentation [here](https://www.npmjs.com/package/nuxt-webfontloader)

```bash
using yarn:

yarn add nuxt-webfontloader
```

And then add config webfontloader to `nuxt.config.js`:

```bash
modules: [
  'nuxt-webfontloader',
],

webfontloader: {
  google: {
    families: ['Lato:400,700'] //Loads Lato font with weights 400 and 700
  }
},
```

## 4. Sitemap Module

Documentation [here](https://sitemap.nuxtjs.org/)

```bash
using yarn:

yarn add @nuxtjs/sitemap
```

Setup config in `nuxt.config.js`:

```bash
modules: [
  '@nuxtjs/sitemap'
]

sitemap: {
  hostname: 'https://example.com',
  gzip: true,
},
```

## 5. Robots Module

Documentation [here](https://github.com/nuxt-community/robots-module)

```bash
using yarn:

yarn add @nuxtjs/robots
```

Setup config in `nuxt.config.js`:

```bash
modules: [
  '@nuxtjs/robots'
]

robots: {
  UserAgent: '*',
  Disallow: '/'
},
```

## 6. Security Module

This module allows you to configure various security headers such as CSP, HSTS or even generate security.txt file. Here is a list of availables features :

- Strict-Transport-Security header
- Content-Security-Policy header
- X-Frame-Options header
- X-Xss-Protection
- X-Content-Type-Options header
- Referrer-Policy header
- Feature-Policy header

security.txt file generation

Documentation [here](https://github.com/dansmaculotte/nuxt-security)

```bash
using yarn:

yarn add @dansmaculotte/nuxt-security
```

Setup config in `nuxt.config.js`:

```bash
modules: [
  // Simple usage
  '@dansmaculotte/nuxt-security'
],

// Top level options
security: {
  csp: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      objectSrc: ["'self'"],
    },
    reportOnly: false,
  },
},
```

## 7. Font Awesome Module

Module to use Font Awesome icons in your Nuxt.js project.

```bash
using yarn:

yarn add @nuxtjs/fontawesome @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons @fortawesome/free-regular-svg-icons
```

Setup config in `nuxt.config.js`:

```bash
buildModules: [
  '@nuxtjs/fontawesome',
],

// Fontawesome module configuration
fontawesome: {
  component: 'fa',
  icons: {
    solid: ['faHome', 'faHeart'],

    // include all icons. But dont do this.
    // solid: true,
    // brands: true,
    // regular: true,
  },
}
```

use on html tag (for free):

- fas = solid icon (@fortawesome/free-solid-svg-icons)
- fab = brands icon (@fortawesome/free-brands-svg-icons)
- far = regular icon (@fortawesome/free-regular-svg-icons)
- fad = duotone icon (@fortawesome/free-duotone-svg-icons)
- fal = light icon (@fortawesome/free-light-svg-icons)

```
<fa :icon="['fas', 'home']" />
```

## 8. Optimized Images Module

Automatically optimizes images used in Nuxt.js projects (JPEG, PNG, SVG, WebP and GIF).

Documentation [here](https://github.com/juliomrqz/nuxt-optimized-images)

```bash
using yarn:

yarn add @aceforth/nuxt-optimized-images
```

Optimization Packages [here](https://marquez.co/docs/nuxt-optimized-images#optimization-packages)

```bash
using yarn:

yarn add imagemin-mozjpeg imagemin-pngquant imagemin-gifsicle imagemin-svgo  webp-loader lqip-loader responsive-loader sqip-loader sharp
```

Setup config in `nuxt.config.js`:

```bash
buildModules: [
  '@aceforth/nuxt-optimized-images',
],

optimizedImages: {
  optimizeImages: true
}
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

---

Do not hesitate if there are suggestions and criticisms 😃 :) [@asapdotid](https://github.com/asapdotid)
