import { drizzle } from 'drizzle-orm/singlestore';
import { Envs } from '@prexo/utils/envs';

export const db = drizzle({ connection: { uri: Envs.DATABASE_URL }});;


