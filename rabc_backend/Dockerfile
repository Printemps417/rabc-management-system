FROM eclipse-temurin:8-jre
# 创建工作目录
RUN mkdir -p /rabc_backend
WORKDIR /rabc_backend

## 将Jar 文件复制到镜像中
COPY ./target/rabc_backend-0.0.1-SNAPSHOT.jar app.jar

## 设置 TZ 时区
ENV TZ=Asia/Shanghai

## 设置 JAVA_OPTS 环境变量，可通过 docker run -e "JAVA_OPTS=" 进行覆盖
ENV JAVA_OPTS="-Xms512m -Xmx512m -Djava.security.egd=file:/dev/./urandom"

## 应用参数
ENV ARGS=""

# 端口8088
EXPOSE 8088

## 启动后端项目
CMD java ${JAVA_OPTS} -jar app.jar $ARGS
# CMD 指令用于指定容器启动时默认执行的命令。这个命令将在容器运行时执行，覆盖任何通过 docker run 传递的命令。