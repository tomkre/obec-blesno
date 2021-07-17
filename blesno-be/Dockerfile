FROM maven:3.6.3-openjdk-8-slim AS builder
WORKDIR /src/app
COPY ./src src
COPY ./pom.xml pom.xml
RUN mvn package

FROM openjdk:8-jre-slim
WORKDIR /src
COPY ./src/main/resources/static/assets/articles assets
COPY --from=builder /src/app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "./app.jar", "--pathToAssets=/src/assets"]

