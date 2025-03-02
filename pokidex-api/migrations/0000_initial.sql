CREATE TABLE `users` (
  `id` text PRIMARY KEY NOT NULL,
  `name` text NOT NULL,
  `created_at` integer NOT NULL,
  `updated_at` integer NOT NULL
);

CREATE TABLE `pokedexes` (
  `id` text PRIMARY KEY NOT NULL,
  `user_id` text NOT NULL,
  `name` text NOT NULL,
  `created_at` integer NOT NULL,
  `updated_at` integer NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade,
  CONSTRAINT `pokedexes_user_id_unique` UNIQUE (`user_id`)
);

CREATE TABLE `pokedex_entries` (
  `id` text PRIMARY KEY NOT NULL,
  `pokedex_id` text NOT NULL,
  `pokemon_id` integer NOT NULL,
  `caught` integer DEFAULT false NOT NULL,
  `created_at` integer NOT NULL,
  `updated_at` integer NOT NULL,
  FOREIGN KEY (`pokedex_id`) REFERENCES `pokedexes`(`id`) ON DELETE cascade
); 