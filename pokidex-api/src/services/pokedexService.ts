import { db } from '../db';
import { pokedexes } from '../db/schema';
import type { Pokedex } from '../types/pokemon';
import { generateId } from '../utils/id';
import { eq } from 'drizzle-orm';

/**
 * Creates a new pokedex for a user
 * @param userId The ID of the user
 * @param name The name of the pokedex
 * @returns The created pokedex
 */
export async function createPokedex(userId: string, name: string): Promise<Pokedex> {
  const now = new Date();
  const pokedexId = generateId();
  
  const newPokedex = {
    id: pokedexId,
    userId,
    name,
    createdAt: now,
    updatedAt: now,
  };
  
  await db.insert(pokedexes).values({
    id: pokedexId,
    userId,
    name,
    createdAt: now,
    updatedAt: now,
  });
  
  return newPokedex;
}

/**
 * Gets all pokedexes
 * @returns All pokedexes
 */
export async function getAllPokedexes(): Promise<Pokedex[]> {
  try {
    const result = await db.select().from(pokedexes);
    
    if (!Array.isArray(result)) {
      return [];
    }
    
    return result.map((pokedex) => ({
      id: pokedex.id,
      userId: pokedex.userId,
      name: pokedex.name,
      createdAt: new Date(pokedex.createdAt),
      updatedAt: new Date(pokedex.updatedAt),
    }));
  } catch (error) {
    console.error('Error in getAllPokedexes:', error);
    throw error;
  }
}

/**
 * Gets a pokedex by ID
 * @param id The ID of the pokedex
 * @returns The pokedex with the given ID, or null if not found
 */
export async function getPokedexById(id: string): Promise<Pokedex | null> {
  const result = await db.select().from(pokedexes).where(eq(pokedexes.id, id)).limit(1);
  
  if (result.length === 0) {
    return null;
  }
  
  const pokedex = result[0];
  
  return {
    id: pokedex.id,
    userId: pokedex.userId,
    name: pokedex.name,
    createdAt: new Date(pokedex.createdAt),
    updatedAt: new Date(pokedex.updatedAt),
  };
}

/**
 * Gets a pokedex by user ID
 * @param userId The ID of the user
 * @returns The pokedex for the given user, or null if not found
 */
export async function getPokedexByUserId(userId: string): Promise<Pokedex | null> {
  const result = await db.select().from(pokedexes).where(eq(pokedexes.userId, userId)).limit(1);
  
  if (result.length === 0) {
    return null;
  }
  
  const pokedex = result[0];
  
  return {
    id: pokedex.id,
    userId: pokedex.userId,
    name: pokedex.name,
    createdAt: new Date(pokedex.createdAt),
    updatedAt: new Date(pokedex.updatedAt),
  };
}

/**
 * Deletes a pokedex by ID
 * @param id The ID of the pokedex to delete
 * @returns True if the pokedex was deleted, false if the pokedex was not found
 */
export async function deletePokedexById(id: string): Promise<boolean> {
  const pokedex = await getPokedexById(id);
  if (!pokedex) {
    return false;
  }
  
  await db.delete(pokedexes).where(eq(pokedexes.id, id));
  return true;
} 