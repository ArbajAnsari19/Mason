# Mason - AI-Powered Notes App

Mason is a full-stack notes application that leverages AI to generate summaries and tags for your notes. The project consists of a **frontend** built with React, Vite, and TypeScript, and a **backend** built with Express, TypeScript, MongoDB, and various AI-integrated utilities.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Configure Environment Variables](#3-configure-environment-variables)
  - [4. Running the Project Locally](#4-running-the-project-locally)
- [Additional Configuration](#additional-configuration)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- A MongoDB instance (local installation or cloud instance like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

## Project Structure

```
Mason/
├── backend/            # Express API server (TypeScript, MongoDB)
└── frontend/           # React app (Vite, TypeScript)
```

## Setup Instructions

### 1. Clone the Repository

Open your terminal and clone the repository. Then, navigate to the project folder:

```shell
cd Mason
```

### 2. Install Dependencies

#### Backend

```shell
cd backend
npm install
```

#### Frontend

```shell
cd ../frontend
npm install
```

### 3. Configure Environment Variables

#### Backend

In the `backend` folder, create (or update) a `.env` file with the following content. Adjust the values as necessary:

```env
PORT=5000
MONGODB_URI="your_mongodb_connection_string"
JWT_SECRET="your_jwt_secret_key"
OPENROUTER_API_KEY="your_openrouter_api_key"
```

### 4. Running the Project Locally

#### Start the Backend Server

From the `backend` folder, run:

```shell
npm run dev
```

This command uses `ts-node-dev` to launch the server on the port specified in your `.env` (default is 5000). You should see output similar to:

```
Server running on http://localhost:5000
MongoDB Connected Successfully
```

#### Start the Frontend App

Open a separate terminal window, navigate to the `frontend` folder, then run:

```shell
npm run dev
```

This will start the Vite development server. The terminal will display the URL (typically `http://localhost:8080` or another port) where the frontend is accessible.

### 5. Accessing the Application

- **Frontend:** Open your browser and navigate to the URL provided by the Vite server.
- **Backend API:** The API endpoints are available at `http://localhost:5000/api`. For example:
  - Authentication endpoints: `http://localhost:5000/api/auth`
  - Notes endpoints: `http://localhost:5000/api/notes`

## Additional Configuration

- **TypeScript Configuration:**  
  - Frontend: Review [tsconfig.node.json](./frontend/tsconfig.node.json) for Vite and bundler settings.  
  - Backend: Check [tsconfig.json](./backend/tsconfig.json) for server-side compilation.

- **Git History:**  
  If you want to start with a fresh Git history, remove all `.git` folders from the root and nested project directories as needed.

## Troubleshooting

- **Environment Variables:** Ensure all variables in the `.env` are correctly set.
- **MongoDB Connection:** Verify your `MONGODB_URI` is valid and that your network allows connection.
- **Dependencies:** If you run into issues, try reinstalling dependencies in both `backend` and `frontend` folders with:
  ```shell
  npm install
  ```
- **Port Conflicts:** If the default ports are busy, update the port settings in the `.env` file for the backend or configure the Vite server accordingly.

Follow these instructions to run Mason locally and enjoy building your AI-powered notes application!