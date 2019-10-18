#FROM qkrapi.azurecr.io/qkrapi:base-image as skiply-base-lib

FROM maven:3-jdk-12-alpine as skiply-base-lib
RUN java -version
RUN mvn -v
WORKDIR /app
COPY . /app
RUN mvn clean install


FROM amazonlinux:latest as skiply-awsbase-lib
#USER ec2-user
RUN /usr/bin/java -version
RUN mvn -v
WORKDIR /app
COPY . /app
RUN mvn clean install
