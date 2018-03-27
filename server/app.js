/**
 * express的设置文件
 * Created by cmq on 2018/3/26.
 */
require('babel-polyfill');
const express = require('express');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const log4js = require('log4js'); // 分级日志打印

const env = process.env.NODE_ENV;
const rootPath = path.resolve(__dirname, '../');

const app = express();
app.set('trust proxy', true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// 本地开发和本地 qa 环境使用开发前端文件，否则使用发布版的前端文件
if(env === 'local' || env === 'qaout') {
  app.use(express.static(path.join(rootPath, 'app')));
} else {
  app.use(express.static(path.join(rootPath, 'app-dist')));
}

app.use('*', (req, res, next) => {
  res.project = req.baseUrl || '';
  next();
});

// 路由
let httpFiles = fs.readdirSync(`./dist/http/`);
httpFiles.forEach((file) => {
  if (file.indexOf('.js') < 0) return;
  require(`./http/${file}`)(app);
});

// err handlers
app.use(function (req, res) {
  const err = new Error('Not Found');
  err.status = 404;
  res.status(404);
  return res.send('');
});
app.use((err, req, res, next) => {
  console.error('Error: ---------');
  console.log(err);
  // TODO: 线上环境返回{}，开发环境返回错误信息
  res.status(err.response.status || 500);
  next(err);
});

app.use(log4js.connectLogger(
  log4js.getLogger("http"),
  {
    level: 'auto',
    format: ':method :status :url '
  }
));

module.exports = app;
