/**
 * Created by cmq on 2018/3/26.
 */
const webpackBrowserLog = require('webpack-browser-log');
const merge = require('webpack-merge');
var config = require('../config')
const webpackDev = require('./webpack.dev.conf');
const webpackBase = require('./webpack.base.conf');
const webpackConfig = merge(webpackBase,webpackDev);
const port = process.env.PORT || config.dev.port;

new webpackBrowserLog(webpackConfig, {
  port : port,
  waitUntilValid : function () {
    console.log(`You application is running here http://localhost:${port}`)
  }
});
