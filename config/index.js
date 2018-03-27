/**
 * 全局配置信息
 * Created by cmq on 2018/3/27.
 */
var path = require('path')

module.exports = {
  dev: {
    env: {
      BUILD_ENV: 'development', // 编译环境
      BASE_API: '"/wx-opt-mgmt/api"'
    },
    port: 9008, // 运行测试页面的端口
    // assetsSubDirectory: 'static', // 前端编译输出的二级目录，js,css 等静态文件
    assetsPublicPath: '/', // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    proxyTable: {}, // 需要 proxyTable 代理的接口（可跨域）
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false, // 是否开启 cssSourceMap
    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'eval-source-map'
  },
  build: {
    env: {
      BUILD_ENV: 'production',
      BASE_API: '"/wx-opt-mgmt/api"'
    },
    port: 9008,
    index: path.resolve(__dirname, '../client-build/index.html'),
    assetsRoot: path.resolve(__dirname, '../client-build'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'] // 需要使用 gzip 压缩的文件扩展名
  }
}