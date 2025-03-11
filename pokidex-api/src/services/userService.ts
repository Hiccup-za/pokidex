import { db } from '../db';
import { users } from '../db/schema';
import type { User } from '../types/pokemon';
import { generateId } from '../utils/id';
import { eq } from 'drizzle-orm';
import { SQL } from 'drizzle-orm';

/**
 * Creates a new user
 * @param name The name of the user
 * @returns The created user
 */
export async function createUser(name: string): Promise<User> {
  const now = new Date();
  const userId = generateId();
  
  const newUser = {
    id: userId,
    name,
    createdAt: now,
    updatedAt: now,
  };
  
  await db.insert(users).values({
    id: userId,
    name,
    createdAt: now,
    updatedAt: now,
  });
  
  return newUser;
}

/**
 * Gets all users
 * @returns All users
 */
export async function getAllUsers(): Promise<User[]> {
  const result = await db.select().from(users);
  
  return result.map((user: any) => ({
    id: user.id,
    name: user.name,
    createdAt: new Date(user.createdAt),
    updatedAt: new Date(user.updatedAt),
  }));
}

/**
 * Gets a user by ID
 * @param id The ID of the user
 * @returns The user with the given ID, or null if not found
 */
export async function getUserById(id: string): Promise<User | null> {
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  
  if (result.length === 0) {
    return null;
  }
  
  const user = result[0];
  
  return {
    id: user.id,
    name: user.name,
    createdAt: new Date(user.createdAt),
    updatedAt: new Date(user.updatedAt),
  };
}

/**
 * Deletes a user by ID
 * @param id The ID of the user to delete
 * @returns True if the user was deleted, false if the user was not found
 */
export async function deleteUserById(id: string): Promise<boolean> {
  // First check if user exists
  const user = await getUserById(id);
  if (!user) {
    return false;
  }
  
  // Proceed with deletion since we know the user exists
  await db.delete(users).where(eq(users.id, id));
  return true;
} 