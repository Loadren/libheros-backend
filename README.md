# Libheros Backend

A backend API built with [NestJS](https://nestjs.com/) and [TypeORM](https://typeorm.io/) for managing users, authentication, lists, and tasks. Uses PostgreSQL as the database.

## Prerequisites

* Node.js (>= 22)
* npm or yarn
* PostgreSQL database

## Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Loadren/libheros-backend.git
   cd libheros-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create a PostgreSQL database**

   Ensure you have a running PostgreSQL instance and create a database for this project:

   ```sql
   CREATE DATABASE libheros;
   ```

4. **Environment variables**

   Copy the `.env.example` to `.env` and update the values. Below is an example structure (values should be replaced with your own credentials):

   ```dotenv
   DB_HOST=localhost
   DB_PORT=5432
   PORT=YOUR_PORT
   DB_USER=postgres
   DB_PASS=your_postgres_password
   DB_NAME=libheros
   JWT_SECRET=your_jwt_secret_key
   CORS_ORIGIN=your_frontend_app_url
   ```

   /!\ Beware as the only CORS requests that you can make are those from the CORS_ORIGIN url.

5. **Run the application**

   ```bash
   npm run start:dev
   ```

   The server will start on `http://localhost:3000` by default.
