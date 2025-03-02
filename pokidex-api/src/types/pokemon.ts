export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  height: number;
  weight: number;
  abilities: string[];
  description: string;
  imageUrl: string;
}

export interface User {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Pokedex {
  id: string;
  userId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PokedexEntry {
  id: string;
  pokedexId: string;
  pokemonId: number;
  caught: boolean;
  createdAt: Date;
  updatedAt: Date;
} 