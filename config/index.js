'use strict'

const path = require('path')
const DOMAIN = 'http://123.206.190.253:8000'
// const DOMAIN = 'http://119.28.140.22:8000'

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api/login/': {
        target: DOMAIN,
        changeOrigin: true
      },
      '/api/after_login/': {
        target: DOMAIN,
        changeOrigin: true
      },
      '/api/company/': {
        target: DOMAIN,
        changeOrigin: true
      },
      '/api/company/*': {
        target: DOMAIN,
        changeOrigin: true
      },
      '/api/user/': {
        target: DOMAIN,
        changeOrigin: true
      },
      '/api/stores/': {
        target: DOMAIN,
        changeOrigin: true
      },
      '/api/stores/*': {
        target: DOMAIN,
        changeOrigin: true
      },
      '/api/user-stores/': {
        target: DOMAIN,
        changeOrigin: true
      },
      '/api/user-stores/*': {
        target: DOMAIN,
        changeOrigin: true
      },
      '/api/print-tag/': {
        target: DOMAIN,
        changeOrigin: true
      },
      '/api/print-tag/*': {
        target: DOMAIN,
        changeOrigin: true
      },
      'supplier-search': {
        target: DOMAIN,
        changeOrigin: true
      },
      '/api/ship-from-address/': {
        target: DOMAIN,
        changeOrigin: true
      },
      '/api/ship-from-address/*': {
        target: DOMAIN,
        changeOrigin: true
      },
      '/api/outbound/': {
        target: DOMAIN,
        changeOrigin: true
      },
      '/api/supplier-search/': {
        target: DOMAIN,
        changeOrigin: true
      },
      '/api/outbound/': {
        target: DOMAIN,
        changeOrigin: true
      },
      '/api/supplier/': {
        target: DOMAIN,
        changeOrigin: true
      },
      '/api/supplier/*': {
        target: DOMAIN,
        changeOrigin: true
      },
      '/api/inbound/': {
        target: DOMAIN,
        changeOrigin: true
      },
      '/api/inbound/*': {
        target: DOMAIN,
        changeOrigin: true
      },
      '/api/warehouse-sku/': {
        target: DOMAIN,
        changeOrigin: true
      },
      '/api/warehouse-sku/*': {
        target: DOMAIN,
        changeOrigin: true
      },
      '/api/fba-barcode-mapping/': {
        target: DOMAIN,
        changeOrigin: true
      },
      '/api/waybill/': {
        target: DOMAIN,
        changeOrigin: true
      },
      '/api/fbashipment/': {
        target: DOMAIN,
        changeOrigin: true
      },
      '/api/package-list/': {
        target: DOMAIN,
        changeOrigin: true
      },
      '/api/myi-file/': {
        target: DOMAIN,
        changeOrigin: true
      },
     '/api/package-preview/': {
        target: DOMAIN,
        changeOrigin: true
      },
      '/api/warehouse-inventory/': {
        target: DOMAIN,
        changeOrigin: true
      }
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8081, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: 'http://47.91.229.92/bsm/dist/', // 配置静态文件的访问根目录地址

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
