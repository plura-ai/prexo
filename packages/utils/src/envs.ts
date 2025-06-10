import { config } from 'dotenv';

// Load both environment files
config({ path: '.env.local' });
config({ path: '.env.prod' });

const isDev = process.env.NODE_ENV === 'development';

export const Envs = {
    DATABASE_URL: isDev ? process.env.DEV_DATABASE_URL! : process.env.DATABASE_URL!,
    BETTER_AUTH_URL: isDev ? process.env.DEV_BETTER_AUTH_URL! : process.env.BETTER_AUTH_URL!,
    BETTER_AUTH_SECRET: isDev ? process.env.DEV_BETTER_AUTH_SECRET! : process.env.BETTER_AUTH_SECRET!,
    POLAR_ACCESS_TOKEN: isDev ? process.env.DEV_POLAR_ACCESS_TOKEN! : process.env.POLAR_ACCESS_TOKEN!,
    POLAR_WEBHOOK_SECRET: isDev ? process.env.DEV_POLAR_WEBHOOK_SECRET! : process.env.POLAR_WEBHOOK_SECRET!,
} as const;

export type Envs = typeof Envs;