import { v4 as uuidv4 } from 'uuid';

/**
 * Generates a UUID with an optional prefix
 * @param prefix The prefix to use for the ID (optional)
 * @returns A UUID with the given prefix
 */
export function generateId(prefix: string = ''): string {
  return `${prefix}${uuidv4()}`;
} 