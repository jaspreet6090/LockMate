
# Lockmate - Password Manager App

Lockmate is a Password Manager application that allows users to log in, sign up, add passwords, and perform CRUD operations on saved passwords.


## Table of Contents

- [Screenshots](#screenshots)
- [Features](#features)
- [Installation](#installation)
- [Frontend](#frontend)
- [Backend](#backend)
- [Hosted Applications](#hosted-applications)

## Screenshots

- Without Login: ![Without Login](/assets/1.png)
- Login Page: ![Login Page](/assets/3.png)
- Signup Page: ![Signup Page](/assets/2.png)
- After Login Page: ![After Login](/assets/4.png)

## Features

- User Authentication (Sign up, Log in, Log out)
- Password Management (Create, Read, Update, Delete)
- Secure storage and encryption of passwords
- User-friendly interface

## Installation

Clone the repository and install dependencies for both frontend and backend:

```bash
git clone <repository-url>
cd lockmate
```

### Frontend

#### Installation

```bash
cd frontend
npm install
```

#### Scripts

- `dev`: Starts the development server.
- `build`: Builds the project for production.
- `lint`: Runs ESLint to check for code quality issues.
- `preview`: Previews the production build.

#### Run Development Server

```bash
npm run dev
```

### Backend

#### Installation

```bash
cd backend
npm install
```

#### Environment Variables

Set up a `.env` file with the following variables:

```plaintext
PORT=5000
MONGODB_URI=<Your MongoDB URI>
JWT_SECRET=<Your JWT Secret>
ENCRYPTION_KEY=<Your Encryption Key>
CORS_ORIGIN=https://ee.vercel.app
```

#### Scripts

- `start`: Starts the application using Node.js.

#### Run Development Server

```bash
npm run start
```

## Hosted Applications

- Frontend: [https://ee.vercel.app](https://ee.vercel.app)
- Backend: [https://ee.onrender.com/api/v1](https://ee.onrender.com/api/v1)


- Happy Coding ❤️
- Jaspreet Singh