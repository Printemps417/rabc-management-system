# 使用Node.js 16版本的Alpine作为基础镜像
FROM node:16-alpine as build-stage

# 设置工作目录
WORKDIR /app

# 复制package.json和yarn.lock文件到容器中
COPY package.json yarn.lock ./

# 安装项目依赖
RUN yarn install --frozen-lockfile

# 将项目文件复制到容器中
COPY . .

# 构建React应用程序（假设使用的是React脚本中的build命令）
RUN yarn build

# 使用Nginx作为Web服务器
FROM nginx:alpine

# 设置时区
ENV TZ=Asia/Shanghai

# 将Nginx配置文件复制到容器中（如果需要自定义Nginx配置）
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# 从构建阶段复制构建好的React应用程序到Nginx的默认静态文件目录
COPY --from=build-stage /app/build /usr/share/nginx/html

# 暴露80端口
EXPOSE 80
