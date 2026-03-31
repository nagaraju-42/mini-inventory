# Stage 1: Build the application
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
# Copy the pom.xml and source code
COPY pom.xml .
COPY src ./src
# Build the application and skip tests for speed
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
# Copy the jar from the build stage to the runtime stage
COPY --from=build /app/target/*.jar app.jar
VOLUME /tmp
ENTRYPOINT ["java","-jar","app.jar"]