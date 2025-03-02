import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const pokedexes = sqliteTable('pokedexes', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }).unique(),
  name: text('name').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const pokedexEntries = sqliteTable('pokedex_entries', {
  id: text('id').primaryKey(),
  pokedexId: text('pokedex_id').notNull().references(() => pokedexes.id, { onDelete: 'cascade' }),
  pokemonId: integer('pokemon_id').notNull(),
  caught: integer('caught', { mode: 'boolean' }).notNull().default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

// Define relations
export const usersRelations = relations(users, ({ one }) => ({
  pokedex: one(pokedexes, {
    fields: [users.id],
    references: [pokedexes.userId],
  }),
}));

export const pokedexesRelations = relations(pokedexes, ({ one, many }) => ({
  user: one(users, {
    fields: [pokedexes.userId],
    references: [users.id],
  }),
  entries: many(pokedexEntries),
}));

export const pokedexEntriesRelations = relations(pokedexEntries, ({ one }) => ({
  pokedex: one(pokedexes, {
    fields: [pokedexEntries.pokedexId],
    references: [pokedexes.id],
  }),
})); 