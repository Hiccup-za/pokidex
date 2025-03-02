import { OpenAPIHono } from '@hono/zod-openapi';
import { 
  createUserRoute, 
  getUsersRoute, 
  getUserByIdRoute, 
  deleteUserRoute 
} from './schema';
import { 
  createUser, 
  getAllUsers, 
  getUserById, 
  deleteUserById 
} from '../../services/userService';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

// Create a router for user endpoints
const userRouter = new OpenAPIHono();

// GET /users - Get all users
userRouter.openapi(getUsersRoute, async (c) => {
  try {
    const users = await getAllUsers();
    
    // Convert Date objects to ISO strings for JSON serialization
    const serializedUsers = users.map(user => ({
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString()
    }));
    
    return c.json(serializedUsers, 200);
  } catch (err) {
    console.error('Error getting users:', err);
    return c.json({ message: 'Internal server error' }, 500);
  }
});

// GET /users/:id - Get a user by ID
userRouter.openapi(getUserByIdRoute, async (c) => {
  const { id } = c.req.valid('param');
  
  try {
    const user = await getUserById(id);
    
    if (!user) {
      return c.json({ message: 'User not found' }, 404);
    }
    
    // Convert Date objects to ISO strings for JSON serialization
    const serializedUser = {
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString()
    };
    
    return c.json(serializedUser, 200);
  } catch (err) {
    console.error(`Error getting user with ID ${id}:`, err);
    return c.json({ message: 'Internal server error' }, 500);
  }
});

// POST /users - Create a new user
userRouter.openapi(createUserRoute, async (c) => {
  const { name } = c.req.valid('json');
  
  try {
    const user = await createUser(name);
    
    // Convert Date objects to ISO strings for JSON serialization
    const serializedUser = {
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString()
    };
    
    return c.json(serializedUser, 201);
  } catch (err) {
    console.error('Error creating user:', err);
    return c.json({ message: 'Internal server error' }, 500);
  }
});

// DELETE /users/:id - Delete a user
userRouter.openapi(deleteUserRoute, async (c) => {
  const { id } = c.req.valid('param');
  
  try {
    const deleted = await deleteUserById(id);
    
    if (!deleted) {
      return c.json({ message: 'User not found' }, 404);
    }
    
    return c.json({ message: 'User deleted successfully' }, 200);
  } catch (err) {
    console.error(`Error deleting user with ID ${id}:`, err);
    return c.json({ message: 'Internal server error' }, 500);
  }
});

export default userRouter; 