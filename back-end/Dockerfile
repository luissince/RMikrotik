# Imagen base con Java 17
FROM eclipse-temurin:17-jdk-focal as build

# Directorio de trabajo
WORKDIR /workspace/app

# Copiar archivos de proyecto Maven
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

# Dar permisos de ejecución al script mvnw
RUN chmod +x ./mvnw

# Construir la aplicación y omitir las pruebas
RUN ./mvnw package -DskipTests

# Imagen final con JRE para producción
FROM eclipse-temurin:17-jre-focal
VOLUME /tmp

# Argumento para especificar la ubicación del jar
ARG JAR_FILE=/workspace/app/target/*.jar

# Copiar el jar de la etapa de construcción
COPY --from=build ${JAR_FILE} app.jar

# Exponer el puerto 8081
EXPOSE 8080

# Comando para ejecutar la aplicación
ENTRYPOINT ["java","-jar","/app.jar"]
