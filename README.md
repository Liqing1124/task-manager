# Task Manager Full Stack Application

A full-stack task management application built with Spring Boot backend and React frontend.

## Technologies Used

### Backend
- Java 17
- Spring Boot 3.x
- Spring Data JPA
- H2 Database (in-memory)

### Frontend
- React 18
- JavaScript ES6+
- CSS3

## Project Structure

```
taskmanagerbe/                # Backend main source code
└── src/main/java/com/soloteam/taskmanagerbe/
    ├── config/               # Spring configuration
    ├── controller/           # REST controllers
    ├── entity/               # Database entities
    └── repository/           # JPA repositories

taskmanagerfe/                # Frontend React application
└── src/
    ├── App.js                # Root component
    ├── App.css               # Root component styles
    ├── index.js              # Entry point
    ├── components/           # React components
    │   ├── TaskManager.js    # Main task management component
    │   └── TaskManager.css   # Styles for task management
    ├── index.css             # Global styles
    └── other utility files   # reportWebVitals, setupTests, etc.
```

## Prerequisites

- Java 17 JDK
- Node.js 16+
- Maven
- Git

## Setup & Running

### Backend
1. Navigate to backend folder:
```bash
cd taskmanagerbe
```

2. Build and run:
```bash
mvn spring-boot:run
```
Spring Boot will start on port 8080

### Frontend
1. Navigate to frontend folder:
```bash
cd taskmanagerfe
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm start
```
React will start on port 3000

## API Documentation

Available at `http://localhost:8080/swagger-ui.html` once backend is running

## Database

H2 in-memory database configured in `application.properties`. Data persists between restarts.

Console available at `http://localhost:8080/h2-console`
- JDBC URL: jdbc:h2:mem:taskdb
- Username: sa   
- Password: (leave empty)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## License

MIT
"# task-manager" 
"# task-manager" 
