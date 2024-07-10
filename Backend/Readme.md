

# Lockmate Backend

Lockmate is a Password Manager application backend developed using Node.js and Express. This backend handles user authentication and CRUD operations for saved passwords.

## Table of Contents

- [Installation](#installation)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [User Routes](#user-routes)
  - [Password Routes](#password-routes)
- [Development](#development)
- [Hosted Application](#hosted-application)

## Installation

To get started with the project, clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd backend
npm install
```

## Scripts

The following scripts are available in the project:

- `start`: Starts the application using Node.js.

You can run these scripts using npm:

```bash
npm run start
```

## Dependencies

The project uses the following main dependencies:

- `express`: ^4.19.2
- `bcrypt`: ^5.1.1
- `cookie-parser`: ^1.4.6
- `cors`: ^2.8.5
- `crypto-js`: ^4.2.0
- `dotenv`: ^16.4.5
- `jsonwebtoken`: ^9.0.2
- `mongoose`: ^8.4.1

## Environment Variables

The following environment variables need to be set in a `.env` file:

```plaintext
PORT=5000
MONGODB_URI=<Your MongoDB URI>
JWT_SECRET=<Your JWT Secret>
ENCRYPTION_KEY=<Your Encryption Key>
CORS_ORIGIN=https://lockmate.vercel.app
```

## API Endpoints

### User Routes

- `POST /api/v1/users/signup`: Register a new user.
- `POST /api/v1/users/login`: Login an existing user.
- `POST /api/v1/users/logout`: Logout the authenticated user.
- `GET /api/v1/users/current-user`: Get the current authenticated user.

### Password Routes

- `POST /api/v1/passwords/password`: Create a new password entry (requires authentication).
- `GET /api/v1/passwords/password`: Get all saved passwords for the authenticated user.
- `DELETE /api/v1/passwords/:id`: Delete a saved password by ID (requires authentication).
- `PATCH /api/v1/passwords/:id`: Update a saved password by ID (requires authentication).

## Development

To start the development server, ensure you have set up the environment variables and run:

```bash
npm run start
```

This will start the server, and you can view the application at `http://localhost:5000`.

## Hosted Application

The backend is currently hosted at [https://lockmate.onrender.com/api/v1](https://lockmate.onrender.com/api/v1).


- Happy Coding ❤️
- Jaspreet Singh
