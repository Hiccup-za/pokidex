# Pokidex API

A RESTful API for managing Pokemon Pokedexes, focusing on Generation 1 Pokemon. This API allows users to create their own Pokedex collections, track which Pokemon they've caught, and manage their Pokemon journey.

## Technologies Used

- [Bun](https://bun.sh/) - JavaScript runtime and package manager
- [Hono](https://hono.dev/) - Lightweight web framework
- [SQLite](https://www.sqlite.org/) - File-based SQL database
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [Swagger UI](https://swagger.io/tools/swagger-ui/) - API documentation

## Project Structure

```
pokidex-api/
├── src/
│   ├── api/           # API route handlers
│   │   ├── user/      # User-related endpoints
│   │   └── pokedex/   # Pokedex-related endpoints
│   │   
│   ├── db/            # Database configuration and schema
│   ├── models/        # Data models
│   ├── services/      # Business logic
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Utility functions
├── migrations/        # Database migrations
└── pokidex.db         # SQLite database file
```

## Features

- User management (create, read, delete)
- Pokedex management (coming soon)
- OpenAPI documentation with Swagger UI
- SQLite database with Drizzle ORM
- UUID-based IDs for all resources

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) v1.1.34 or higher

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

### Database Setup

Run the database migrations to set up the SQLite database:

```bash
bun run db:migrate
```

### Running the Server

#### Development Mode

Run the server in development mode with hot reloading:

```bash
bun run dev
```

#### Production Mode

Run the server in production mode:

```bash
bun run start
```

The server will start on port 3000 by default. You can access the API at `http://localhost:3000/api`.

## API Documentation

The API documentation is available via Swagger UI when the server is running:

```
http://localhost:3000/swagger
```

## Available Endpoints

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a user by ID
- `POST /api/users` - Create a new user
- `DELETE /api/users/:id` - Delete a user

## Database Management

### Run Migrations

Run the database migrations to set up or update the SQLite database:

```bash
bun run db:migrate
```

This command will check if the database tables already exist and only run migrations if needed.

### Generate Migration Files

To generate migration files based on schema changes:

```bash
bun run db:generate
```

### Update Schema Definition

To update the schema definition based on your Drizzle schema:

```bash
bun run db:schema
```

This will generate SQL migration files in the `migrations` directory.

## Development

This project was created using `bun init` in bun v1.1.34. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
