<h1 align="center">TYPEORM AND SWAGGER</h1>
<div align="center">
<img width="150px" src="./public/images/Nest.js.png" />
<img width="150px" src="./public/images/Swagger.png" />
<img width="150px" src="./public/images/PostgresSQL.png" />
</div>

<br />

<p>A NestJS project using TypeORM with PostgreSQL, implementing user authentication and API documentation with Swagger.</p>

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Migration](#database-migration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

## Introduction

This project is a backend application built with NestJS and TypeORM, using PostgreSQL as the database. It includes user authentication and API documentation with Swagger.

## Features

- User authentication (registration, login, JWT-based authentication)
- CRUD operations
- API documentation using Swagger

## Tech Stack

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Swagger](https://swagger.io/)
- [Jaeger](https://www.jaegertracing.io/)

## Installation

- Clone the repository:

```bash
git clone https://github.com/DevFromImmutable/nestypeorm

cd nestypeorm
```

- Install dependencies:

```bash
npm install
```

# Configuration

1. Create a .env file in the root directory and add the following environment variables:

```makefile
# APPLICATION SECRETS
APPLICATION_PORT=3000

# DB CONFING
DB_USERNAME="your_db_username"
DB_PASSWORD="your_db_password"
DB_DATABASE="your_db_name"
DB_HOST="your_host"
DB_PORT=your_port

# URLS [WHITE URLS FOR CORS PROBLEM]
WHITE_URL="frontend_url"

# JWT_SECRETS
JWT_SECRET_KEY="your_jwt_secret"
JWT_EXPIRE_TIME="expire_time"
```

## Database Migration

Create your entities in each module and to generate migration for your entities run this command.

- Generate a new migration:

```bash
npm run migration:generate migration_file_path_and_filename
```

- Run migrations:

```bash
npm run migration:run

```

- Revert Migration:

```bash
npm run typeorm:revert
```

- Check Migration list and status:

```bash
npm run migration:status
```

## Running the Application

1. Start the development server:

```bash
npm run start:dev
```

2. The application will be running at [localhost:3000](http://localhost:3000).

# API Documentation

The Swagger API documentation is available at [Swagger Docs](http://localhost:3000/api/v1).

# Contributing

1. Fork the repository.
2. Create a new branch (git checkout -b feature/your-feature).
3. Make your changes.
4. Commit your changes (git commit -m 'Add some feature').
5. Push to the branch (git push origin feature/your-feature).
6. Create a new Pull Request.
