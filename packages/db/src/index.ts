import { drizzle } from 'drizzle-orm/singlestore';
import { eq } from 'drizzle-orm';
import { usersTable } from './schema';
import { Envs } from '@prexo/utils/envs';

export const db = drizzle(Envs.DATABASE_URL);

async function main() {
  try {
    const user: typeof usersTable.$inferInsert = {
      id: 1,
      name: 'John',
      age: 30,
      email: 'john@example.com',
    };

    await db.insert(usersTable).values(user);
    console.log('New user created!');

    const users = await db.select().from(usersTable);
    console.log('Getting all users from the database: ', users);

    await db
      .update(usersTable)
      .set({
        age: 31,
      })
      .where(eq(usersTable.id, user.id)); // Changed to use id instead of email
    console.log('User info updated!');

    await db.delete(usersTable).where(eq(usersTable.id, user.id)); // Changed to use id instead of email
    console.log('User deleted!');
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
