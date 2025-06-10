import { defineConfig } from 'drizzle-kit';
import { Envs } from './packages/utils/src/envs';

export default defineConfig({
  out: './drizzle',
  schema: './packages/db/schema.ts',
  dialect: 'singlestore',
  dbCredentials: {
    url: Envs.DATABASE_URL,
  },
});
