import { int, singlestoreTable, varchar } from 'drizzle-orm/singlestore-core';

export const usersTable = singlestoreTable('users_table', {
  id: int().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  age: int().notNull(),
  email: varchar({ length: 255 }).notNull(),
});
