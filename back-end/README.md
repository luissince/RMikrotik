# 🧾 GeneradoScripts

**Generador de scripts para Mikrotik**  
Proyecto desarrollado con **Spring Boot 3.3.7**, orientado a automatizar la creación de scripts de configuración para dispositivos Mikrotik. Utiliza una base de datos MySQL para almacenar la información necesaria.

---

## 📦 Requisitos previos

Antes de iniciar, asegúrate de tener instalado:

- [Java 17](https://adoptium.net/)
- [Apache Maven](https://maven.apache.org/)
- [MySQL Server](https://www.mysql.com/)

### ✅ Verificar instalaciones

Abre una terminal (CMD, PowerShell, Terminal o Bash) y ejecuta los siguientes comandos:

```bash
java -version
# Esperado: Java 17.x.x

mvn -v
# Esperado: Apache Maven 3.x.x
```

Si no tienes Java o Maven, puedes instalarlos desde sus sitios oficiales o usando un gestor de paquetes:

#### En macOS (con Homebrew)

```bash
brew install openjdk@17
brew install maven
```

#### En Ubuntu/Debian

```bash
sudo apt update
sudo apt install openjdk-17-jdk maven
```

#### En Windows

- Descarga e instala Java 17 desde [Adoptium](https://adoptium.net/)
- Instala Maven y agrégalo al `PATH`.

---

## ⚙️ Configurar base de datos

1. Asegúrate de tener MySQL en ejecución.
2. Crea una base de datos llamada por ejemplo: `mikrotik_scripts`.

```sql
CREATE DATABASE mikrotik_scripts;
```

3. Configura tu archivo `application.properties` en:

```
src/main/resources/application.properties
```

Ejemplo de configuración:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/mikrotik_scripts
spring.datasource.username=TU_USUARIO
spring.datasource.password=TU_PASSWORD
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

---

## 🚀 Cómo iniciar el proyecto

### Opción 1: Ejecutar desde terminal

```bash
mvn clean install
mvn spring-boot:run
```

### Opción 2: Ejecutar el JAR

Después de compilar:

```bash
mvn package
java -jar target/GeneradoScripts-0.0.1-SNAPSHOT.jar
```

---

## 🧪 Ejecutar pruebas

```bash
mvn test
```

---

## 🔍 Endpoints expuestos

Una vez iniciado, la API estará disponible en:

```
http://localhost:8080
```

Si usas `spring-data-rest`, tus entidades estarán disponibles automáticamente como endpoints RESTful si están en un repositorio público.

---

## 🛠️ Tecnologías usadas

- **Java 17**
- **Spring Boot 3.3.7**
  - Spring Web
  - Spring Data JPA
  - Spring Data REST
- **MySQL**
- **Maven**
- **Lombok**

---

## 📁 Estructura del proyecto

```
src/
├── main/
│   ├── java/
│   │   └── com/okta/mongodb/GeneradoScripts/
│   ├── resources/
│   │   └── application.properties
└── test/
```

---

## 💡 Tips

- Si usas **IntelliJ IDEA o Eclipse**, importa el proyecto como *Maven Project*.
- Asegúrate de tener **Lombok** instalado en tu IDE.

---

## 📄 Licencia

Este proyecto aún no cuenta con una licencia definida.

---

## 👤 Autor

Desarrollado por **[Tu Nombre o Empresa]**

---