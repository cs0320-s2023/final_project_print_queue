FROM openjdk:17

# Set the working directory
WORKDIR /app

# Copy your .jar file to the Docker container
COPY backend/s0-1.0-SNAPSHOT.jar /app/app.jar

# Set the entrypoint for running your Java application
ENTRYPOINT ["java", "-jar", "/app/app.jar"]