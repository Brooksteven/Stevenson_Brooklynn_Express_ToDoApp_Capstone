# 🖥️ KAIZEN ToDo App - Backend

## 📖 Project Blurb

This Express-based backend API supports a full-featured ToDo app. It provides RESTful endpoints to manage tasks—enabling users to create, read, update, and delete items. The server uses in-memory storage (or a simple file-based alternative), demonstrating backend logic, route management, and data handling.

---

## 🔗 Frontend Repository

➡️ [React Frontend Repo](https://github.com/Brooksteven/Stevenson_Brooklynn_React_ToDoApp_Capstone)

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- CORS
- Body-parser
- Nodemon
- Git & GitHub

---

## 👤 User Stories

- As a developer, I want to fetch all tasks from an API endpoint.
- As a developer, I want to send POST requests to create new tasks.
- As a developer, I want to send PUT requests to update tasks.
- As a developer, I want to delete tasks through DELETE requests.
- As a developer, I want proper error handling for edge cases and invalid input.

---

## 🛠️ Installation Instructions

1. Clone the repository:

    ```bash
    git clone https://github.com/Brooksteven/Stevenson_Brooklynn_Express_ToDoApp_Capstone.git
    ```

2. Navigate into the directory:

    ```bash
    cd Stevenson_Brooklynn_Express_ToDoApp_Capstone
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the server (development mode):

    ```bash
    npm run dev
    ```

> 🌐 The server will run at `http://localhost:3000` unless otherwise configured.

---

## 📡 API Endpoints

| Method | Endpoint         | Description              |
|--------|------------------|--------------------------|
| GET    | `/api/items`     | Get all tasks            |
| POST   | `/api/items`     | Add a new task           |
| PUT    | `/api/items/:id` | Update a task by ID      |
| DELETE | `/api/items/:id` | Delete a task by ID      |

---

## 🔑 API Keys or External Services

No external APIs or keys are required.

---

## 📚 Resources Used

- [Express.js Documentation](https://expressjs.com/)
- [Node.js Docs](https://nodejs.org/en/docs/)
- [MDN HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
- Fruits App
- Bryan Santos Office Hours

---

## 🔮 Future Plans

- Implement user accounts and task ownership
- Add logging and environment-based configuration
- Write unit tests for routes
