### 运行命令
#### 1. 环境
- 前端区分 development/production 环境，通过 BUILD_ENV 参数配置

  development 本地调试环境，production 部署上线环境

- node 端区分 local/dev/qa/prod 环境，以便调用不同环境下的 api。通过 NODE_ENV 参数配置

#### 1. 开发环境（在本地电脑运行，具体连接数据的环境根据 NODE_ENV 配置）

```
npm run node:local # 只运行本地环境的 node 后台，前端项目需独立编译运行
npm run node:dev # 只运行本地环境的 node 后台，前端项目需独立编译运行
npm run node:qa # 只运行本地环境的 node 后台，前端项目需独立编译运行

cd app
... # 编译前端项目，并在浏览器端打开
```

2. 部署到服务器
```
npm run node:publish # 编译前端及 node 代码，打包成 docker 镜像
```