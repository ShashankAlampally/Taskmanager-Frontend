# Task Management Tool

## Overview
The Task Management Tool is a web application designed to help users manage their tasks efficiently. Users can create, view, update, and delete tasks, with the ability to set priorities and statuses for each task. 

## Tools Used
### Frontend:
* React
* React Bootstrap
* Axios
* React Router
* Material UI
* DataTable
### Backend:
* Node.js
* Express
* MongoDB (Mongoose)
* JWT (Json Web Token) for authentication

## Setup Instructions

### Prerequisites
Ensure you have the following installed:

* Node.js
* npm (Node Package Manager)
* MongoDB (you can use a local instance or MongoDB Atlas)

### Frontend Setup
#### 1. Clone the frontend repository:

```sh
git clone <'https://github.com/ShashankAlampally/Taskmanager-Frontend'>
cd frontend
```
#### 2. Install dependencies:

```sh
npm install
```

#### 3. Start the development server:

```sh
npm start
```

The frontend server will run on http://localhost:3000.

### Backend Setup

#### 1.Clone the backend repository:

```sh
git clone <'https://github.com/ShashankAlampally/Taskmanager-Backend'>
cd backend
```

#### 2.Install dependencies:

```sh
npm install
```

#### 3.Start the backend server:

```sh
npm start
```
The backend server will run on http://localhost:5005.


### How to Run the Application

####  1. Start the backend server by following the backend setup instructions.
####  2. Start the frontend server by following the frontend setup instructions.
####  3. Open your browser and navigate to http://localhost:3000 to start using the Task Management Tool.


## API Documentation

### Authentication:
#### 1.Signup:
    Endpoint: 'POST /signup'
    Description: Register a new user.
    Body Parameters: 'username','email', 'password'
#### 2.Login:
    Endpoint: POST /login
    Description: Authenticate an existing user.
    Body Parameters: email, password
### Tasks:
#### 1.Create Task:
    Endpoint: POST /tasks/create
    Description: Create a new task.
    Body Parameters: taskName, description, priority, status
#### 2.View Tasks:
    Endpoint: GET /tasks/view
    Headers: x-access-token: <token>
#### 3.Update Task:
    Endpoint: PUT /tasks/update/:id
    Description: Update an existing task.
    Headers: x-access-token: <token>
    Body Parameters: taskName, description, priority, status
#### 4.Delete Task:
    Endpoint: DELETE /tasks/delete/:id
    Description: Delete an existing task.
    Headers: x-access-token: <token>

## Deployment:
### Backend Deployment:
  The backend of the Task Management Tool is deployed using Render.
#### Link:
```sh
https://taskmanager-1-29to.onrender.com
```

### Frontend Deployment:
  The frontend is deployed using Vercel.
#### Link:
```sh
https://taskmanager-frontend-a68i.vercel.app/
```
