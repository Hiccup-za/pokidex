import { z } from 'zod';
import { createRoute } from '@hono/zod-openapi';

// Common schemas
const errorResponseSchema = z.object({
  message: z.string().describe('Error message'),
});

// User schemas
export const userSchema = z.object({
  id: z.string().describe('The unique identifier for the user'),
  name: z.string().describe('The name of the user'),
  createdAt: z.string().datetime().describe('When the user was created'),
  updatedAt: z.string().datetime().describe('When the user was last updated'),
});

export const createUserSchema = z.object({
  name: z.string().min(1).describe('The name of the user'),
});

// Routes
export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  tags: ['Users'],
  summary: 'Get all users',
  description: 'Returns a list of all users',
  responses: {
    200: {
      description: 'List of users',
      content: {
        'application/json': {
          schema: z.array(userSchema),
        },
      },
    },
    500: {
      description: 'Internal server error',
      content: {
        'application/json': {
          schema: errorResponseSchema,
        },
      },
    },
  },
});

export const getUserByIdRoute = createRoute({
  method: 'get',
  path: '/users/:id',
  tags: ['Users'],
  summary: 'Get a user by ID',
  description: 'Returns a user by their ID',
  request: {
    params: z.object({
      id: z.string().describe('The ID of the user to retrieve'),
    }),
  },
  responses: {
    200: {
      description: 'The user',
      content: {
        'application/json': {
          schema: userSchema,
        },
      },
    },
    404: {
      description: 'User not found',
      content: {
        'application/json': {
          schema: errorResponseSchema,
        },
      },
    },
    500: {
      description: 'Internal server error',
      content: {
        'application/json': {
          schema: errorResponseSchema,
        },
      },
    },
  },
});

export const createUserRoute = createRoute({
  method: 'post',
  path: '/users',
  tags: ['Users'],
  summary: 'Create a new user',
  description: 'Creates a new user and returns the created user',
  request: {
    body: {
      content: {
        'application/json': {
          schema: createUserSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'The created user',
      content: {
        'application/json': {
          schema: userSchema,
        },
      },
    },
    400: {
      description: 'Invalid request body',
      content: {
        'application/json': {
          schema: errorResponseSchema,
        },
      },
    },
    500: {
      description: 'Internal server error',
      content: {
        'application/json': {
          schema: errorResponseSchema,
        },
      },
    },
  },
});

export const deleteUserRoute = createRoute({
  method: 'delete',
  path: '/users/:id',
  tags: ['Users'],
  summary: 'Delete a user',
  description: 'Deletes a user by their ID',
  request: {
    params: z.object({
      id: z.string().describe('The ID of the user to delete'),
    }),
  },
  responses: {
    200: {
      description: 'User deleted successfully',
      content: {
        'application/json': {
          schema: errorResponseSchema,
        },
      },
    },
    404: {
      description: 'User not found',
      content: {
        'application/json': {
          schema: errorResponseSchema,
        },
      },
    },
    500: {
      description: 'Internal server error',
      content: {
        'application/json': {
          schema: errorResponseSchema,
        },
      },
    },
  },
}); 