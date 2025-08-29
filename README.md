# TODO-App - Full Stack MERN Todo Application

A production-ready todo application built with the MERN stack (MongoDB, Express, React, Node.js) featuring modern development practices, responsive design, and real-time CRUD operations.

![MERN Stack](https://img.shields.io/badge/MERN-Full%20Stack-blue)
![React](https://img.shields.io/badge/React-18.2-61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-16+-339933)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-47A248)
![Express](https://img.shields.io/badge/Express-4.18-000000)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC)

## 🎯 Features

- ✅ **Full CRUD Operations** - Create, read, update, and delete todos
- 🔄 **Real-time Updates** - Instant UI synchronization with database
- 🏷️ **Priority System** - High, medium, and low priority levels
- 📅 **Due Date Management** - Visual date indicators and sorting
- 🔍 **Smart Filtering** - View all, completed, or pending tasks
- 🌙 **Dark/Light Theme** - System-aware theme switching with persistence

## 🛠️ Technology Stack

**Frontend**

- React 18 (hooks & functional components)
- Context API (state management)
- Tailwind CSS (responsive design)
- Custom Hooks (API calls, state logic)

**Backend**

- Node.js
- Express.js
- MongoDB + Mongoose
- CORS configuration

**Development Tools**

- Git & GitHub
- Thunder Client (API testing)
- MongoDB Compass (visualization)

## 📁 Project Structure

```
TaskFlow/
├── client/              # React Frontend Application
│   ├── src/
│   │   ├── pages/
│   │   ├── assets/
│   │   └── App.js
│   ├── public/
│   └── package.json     # Frontend dependencies
|
├── server/              # Express Backend API
│   ├── models/          # MongoDB schema definitions
│   │   └── Todo.js
│   ├── routes/          # API route handlers
│   │   └── routes.js
│   ├── controllers/     # Business logic controllers
│   │   └── todosController.js
│   ├── config/
│   │   └── database.js  # MongoDB connection setup
│   └── server.js        # Express server initialization
├── .gitignore
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites

- Node.js 16+
- MongoDB 6.0+
- npm

### Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your MongoDB connection string

# Start development server
node server
# Server runs on http://localhost:5000
```

### Frontend Setup

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start development server
npm start
# Client runs on http://localhost:3000
```

### Database Setup

1. Install MongoDB Community Edition
2. Start MongoDB service
3. Create a database named **todoapp**
4. Update the connection string in `server/.env`

## 📡 API Documentation

**Base URL:** `http://localhost:5000/api`

### Endpoints

| Method | Endpoint   | Description     | Request Body                        |
| ------ | ---------- | --------------- | ----------------------------------- |
| GET    | /todos     | Fetch all todos | None                                |
| POST   | /addTodo   | Create new todo | { title, priority, dueDate, notes } |
| PUT    | /todos/:id | Update todo     | { completed, priority, etc. }       |
| DELETE | /todos/:id | Delete todo     | None                                |

### Example Requests

```javascript
// Create todo
POST /api/addTodo
Body: {
  "title": "Learn React Testing",
  "priority": "high",
  "dueDate": "2023-12-31",
  "notes": "Complete testing implementation"
}

// Update todo
PUT /api/todos/507f1f77bcf86cd799439011
Body: {
  "completed": true
}
```

## 📸 Screenshots

### Home Page

![Home Screenshot](./app-imgs/Screenshot%202025-08-30%20040725.png)

### Home Page (Dark)

![Home Screenshot(Dark)](./app-imgs/Screenshot%202025-08-30%20040743.png)

### Add Todo

![Add Todo Screenshot](./app-imgs/Screenshot%202025-08-30%20040829.png)

### Delete Tod

![Del Todo Screenshot](./app-imgs/Screenshot%202025-08-30%20040852.png)

### Filter

![Filter Screenshot](./app-imgs/Screenshot%202025-08-30%20040916.png)

## 📝 License

This project is open source and available under the MIT License.
