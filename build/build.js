/**
 * 打包发布
 * Created by cmq on 2018/3/26.
 */
const base = require('./webpack.base')
const merge = require('webpack-merge')
const webpack = require('webpack')
const ora = require('ora') //终端显示的转轮loading
const rm = require('rimraf')  //node环境下rm -rf的命令库
const path = require('path')  //文件路径处理库
const chalk = require('chalk')  //终端显示带颜色的文字
const webpackPro = require('./webpack.build.conf')
const config = require('../config')
const webpackConfig = merge(base,webpackPro)

// 在终端显示ora库的loading效果
var spinner = ora('> building for production...')
spinner.start()

// 删除已编译文件
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err

  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err

    // 在编译完成的回调函数中,在终端输出编译的文件
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n')

    console.log(chalk.cyan('> Build complete.\n'))
  })
})
