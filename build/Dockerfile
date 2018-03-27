# 使用DaoCloud的Ubuntu镜像
FROM daocloud.io/library/ubuntu:14.04
#FROM registry.cn-hangzhou.aliyuncs.com/node:v8.9.3

# 设置镜像作者
MAINTAINER chenminqiong <aimee@soundbus.cn>

# 设置时区
RUN sudo sh -c "echo 'Asia/Shanghai' > /etc/timezone" && \
    sudo dpkg-reconfigure -f noninteractive tzdata

# 使用阿里云的Ubuntu镜像
RUN echo '\n\
deb http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse\n\
deb http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse\n\
deb http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse\n\
deb http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse\n\
deb http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse\n\
deb-src http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse\n\
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse\n\
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse\n\
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse\n\
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse\n'\
> /etc/apt/sources.list

# 安装node v8.9.3
RUN sudo apt-get update && sudo apt-get install -y wget

# 使用淘宝镜像安装Node.js v8.9.3
RUN wget https://npm.taobao.org/mirrors/node/v8.9.3/node-v8.9.3-linux-x64.tar.gz && \
    tar -C /usr/local --strip-components 1 -xzf node-v8.9.3-linux-x64.tar.gz && \
    rm node-v8.9.3-linux-x64.tar.gz

# You start off as the 'strongloop' user.
# If a RUN command needs root, you can use sudo

# In addition to standard Linux commands you also have access to node, npm,
# and slc commands

# Define working directory.
WORKDIR /dist/bin/

# Mount application compressed file
ADD application.tar .

# we copied node_modules with application.tar, so we don't need to run 'npm install'
#RUN npm install

# 使用淘宝的npm镜像
#RUN npm install --production -d --registry=https://registry.npm.taobao.org

ENV NODE_ENV prod
EXPOSE 9004
CMD [ "node", "./dist/bin/www.js" ]
