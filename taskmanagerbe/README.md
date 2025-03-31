# Task Manager Backend 

## Overview 
Spring Boot backend for the Task Manager application, providing RESTful API endpoints for task management. 
 
## Technologies 
- Java 17 
- Spring Boot 3.x 
- Spring Data JPA 
- PostgreSQL Database 
- Maven 
 
## Project Structure 
```
src/
├── main/
│   ├── java/com/soloteam/taskmanagerbe/
│   │   ├── config/       # Spring configuration classes
│   │   ├── controller/   # REST API controllers
│   │   ├── entity/       # JPA entity models
│   │   ├── repository/   # JPA repositories
│   │   └── service/      # Business logic services
│   └── resources/
│       └── application.properties
└── test/                 # Unit and integration tests
```
 
## Prerequisites 
- Java 17 JDK 
- Maven 
- Git 
 
## Running the Application 
```bash
# Build the project 
mvn clean package 
 
# Run the application 
mvn spring-boot:run 
```
 
The application will start on `http://localhost:8080` 
 
## API Documentation 
Swagger UI is available at `http://localhost:8080/swagger-ui.html` 
 
## Database Configuration

### Important Security Note
**IMPORTANT:** You must configure your database connection in `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://your-database-host:5432/your-database
spring.datasource.username=your-username
spring.datasource.password=your-secure-password
```

### Connection Steps
1. Open `src/main/resources/application.properties`
2. Replace the database connection details with your own
3. Ensure your database is accessible and credentials are correct

### Supported Databases
- PostgreSQL (currently configured)
- Can be adapted to other databases by changing Hibernate dialect
 
## Testing 
```bash
# Run unit and integration tests
mvn test
```

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Create a Pull Request

## License
MIT License
