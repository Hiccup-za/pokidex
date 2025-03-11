import { OpenAPIHono } from '@hono/zod-openapi';
import { 
  createPokedexRoute, 
  getPokedexesRoute, 
  getPokedexByIdRoute, 
  deletePokedexRoute 
} from './schema';
import { 
  createPokedex, 
  getAllPokedexes, 
  getPokedexById, 
  deletePokedexById,
  getPokedexByUserId
} from '../../services/pokedexService';
import { getUserById } from '../../services/userService';

// Create a router for pokedex endpoints
const pokedexRouter = new OpenAPIHono();

// GET /pokedex - Get all pokedexes
pokedexRouter.openapi(getPokedexesRoute, async (c) => {
  try {
    const pokedexes = await getAllPokedexes();
    
    // Convert Date objects to ISO strings for JSON serialization
    const serializedPokedexes = pokedexes.map(pokedex => ({
      ...pokedex,
      createdAt: pokedex.createdAt.toISOString(),
      updatedAt: pokedex.updatedAt.toISOString()
    }));
    
    return c.json(serializedPokedexes, 200);
  } catch (err) {
    console.error('Error getting pokedexes:', err);
    return c.json({ message: 'Internal server error' }, 500);
  }
});

// GET /pokedex/:id - Get a pokedex by ID
pokedexRouter.openapi(getPokedexByIdRoute, async (c) => {
  const { id } = c.req.valid('param');
  
  try {
    const pokedex = await getPokedexById(id);
    
    if (!pokedex) {
      return c.json({ message: 'Pokedex not found' }, 404);
    }
    
    // Convert Date objects to ISO strings for JSON serialization
    const serializedPokedex = {
      ...pokedex,
      createdAt: pokedex.createdAt.toISOString(),
      updatedAt: pokedex.updatedAt.toISOString()
    };
    
    return c.json(serializedPokedex, 200);
  } catch (err) {
    console.error(`Error getting pokedex with ID ${id}:`, err);
    return c.json({ message: 'Internal server error' }, 500);
  }
});

// POST /pokedex - Create a new pokedex
pokedexRouter.openapi(createPokedexRoute, async (c) => {
  const { userId, name } = c.req.valid('json');
  
  try {
    // Validate that the user exists
    const user = await getUserById(userId);
    if (!user) {
      return c.json({ message: 'User not found' }, 404);
    }

    // Check if user already has a pokedex
    const existingPokedex = await getPokedexByUserId(userId);
    if (existingPokedex) {
      return c.json({ message: 'User already has a pokedex' }, 400);
    }
    
    const pokedex = await createPokedex(userId, name);
    
    // Convert Date objects to ISO strings for JSON serialization
    const serializedPokedex = {
      ...pokedex,
      createdAt: pokedex.createdAt.toISOString(),
      updatedAt: pokedex.updatedAt.toISOString()
    };
    
    return c.json(serializedPokedex, 201);
  } catch (err) {
    console.error('Error creating pokedex:', err);
    return c.json({ message: 'Internal server error' }, 500);
  }
});

// DELETE /pokedex/:id - Delete a pokedex
pokedexRouter.openapi(deletePokedexRoute, async (c) => {
  const { id } = c.req.valid('param');
  
  try {
    const deleted = await deletePokedexById(id);
    
    if (!deleted) {
      return c.json({ message: 'Pokedex not found' }, 404);
    }
    
    return c.json({ message: 'Pokedex deleted successfully' }, 200);
  } catch (err) {
    console.error(`Error deleting pokedex with ID ${id}:`, err);
    return c.json({ message: 'Internal server error' }, 500);
  }
});

export default pokedexRouter; 