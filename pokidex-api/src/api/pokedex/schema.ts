import { z } from 'zod';
import { createRoute } from '@hono/zod-openapi';

// Common schemas
const errorResponseSchema = z.object({
  message: z.string().describe('Error message'),
});

// Pokedex schemas
export const pokedexSchema = z.object({
  id: z.string().describe('The unique identifier for the pokedex'),
  userId: z.string().describe('The ID of the user who owns this pokedex'),
  name: z.string().describe('The name of the pokedex'),
  createdAt: z.string().datetime().describe('When the pokedex was created'),
  updatedAt: z.string().datetime().describe('When the pokedex was last updated'),
});

export const createPokedexSchema = z.object({
  userId: z.string().min(1).describe('The ID of the user who will own this pokedex'),
  name: z.string().min(1).describe('The name of the pokedex'),
});

// Routes
export const getPokedexesRoute = createRoute({
  method: 'get',
  path: '/pokedex',
  tags: ['Pokedex'],
  summary: 'Get all pokedexes',
  description: 'Returns a list of all pokedexes',
  responses: {
    200: {
      description: 'List of pokedexes',
      content: {
        'application/json': {
          schema: z.array(pokedexSchema),
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

export const getPokedexByIdRoute = createRoute({
  method: 'get',
  path: '/pokedex/:id',
  tags: ['Pokedex'],
  summary: 'Get a pokedex by ID',
  description: 'Returns a pokedex by its ID',
  request: {
    params: z.object({
      id: z.string().describe('The ID of the pokedex to retrieve'),
    }),
  },
  responses: {
    200: {
      description: 'The pokedex',
      content: {
        'application/json': {
          schema: pokedexSchema,
        },
      },
    },
    404: {
      description: 'Pokedex not found',
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

export const createPokedexRoute = createRoute({
  method: 'post',
  path: '/pokedex',
  tags: ['Pokedex'],
  summary: 'Create a new pokedex',
  description: 'Creates a new pokedex for the specified user. A user can only have one pokedex at a time.',
  request: {
    body: {
      content: {
        'application/json': {
          schema: createPokedexSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'The created pokedex',
      content: {
        'application/json': {
          schema: pokedexSchema,
        },
      },
    },
    400: {
      description: 'Invalid request or user already has a pokedex',
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

export const deletePokedexRoute = createRoute({
  method: 'delete',
  path: '/pokedex/:id',
  tags: ['Pokedex'],
  summary: 'Delete a pokedex',
  description: 'Deletes a pokedex by its ID',
  request: {
    params: z.object({
      id: z.string().describe('The ID of the pokedex to delete'),
    }),
  },
  responses: {
    200: {
      description: 'Pokedex deleted successfully',
      content: {
        'application/json': {
          schema: errorResponseSchema,
        },
      },
    },
    404: {
      description: 'Pokedex not found',
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