import { Hono } from 'hono';
import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { initializeDatabase } from './db';

// Import routes
import userRouter from './api/user/controller';

// Initialize the database
await initializeDatabase();

// Create the main app
const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', cors());

// API routes with OpenAPI
const api = new OpenAPIHono();

// Mount routes
api.route('/', userRouter);

// OpenAPI documentation
api.doc('swagger-doc', {
  openapi: '3.0.0',
  info: {
    title: 'Pokidex API',
    version: '1.0.0',
    description: 'API for managing Pokemon Pokedexes',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Local server',
    },
  ],
});

// Mount API routes
app.route('/api', api);

// Swagger UI
app.get(
  '/swagger',
  swaggerUI({
    url: '/api/swagger-doc',
  })
);

// Health check endpoint
app.get('/', (c) => c.json({ status: 'ok', message: 'Pokidex API is running' }));

// Start the server
const port = process.env.PORT || 3000;
console.log(`Server is running on port ${port}`);

export default {
  port,
  fetch: app.fetch,
}; 