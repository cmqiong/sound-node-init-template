/**
 * server 环境配置
 * Created by cmq on 2018/3/26.
 */
const env = process.env.NODE_ENV;
console.log('Web server access at environment: ' + env + ' ~~~~~~~');

const common = {}; // 默认配置

const local = {
  port: '9008', // server 端口
  baseURL: 'http://wx.dev.sunbar.cn:8081/', // 实际转发的后台 api 地址
};

const dev = {
  port: '9008',
  baseURL: 'http://wx.dev.sunbar.cn:8081/',
};

const qa = {
  port: '9008',
  baseURL: 'http://真实的 qa 环境地址/',
};

const prod = {
  port: '9008',
  baseURL: 'http://真实的 prod 环境地址/',
};

let config;
switch (env) {
  case "prod":
    config = Object.assign(common, prod);
    break;
  case "qa":
    config = Object.assign(common, qa);
    break;
  case "dev":
    config = Object.assign(common, dev);
    break;
  default:
    config = Object.assign(common, local);
    break;
}

export default config;
