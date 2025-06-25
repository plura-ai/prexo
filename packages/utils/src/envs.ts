import { config } from 'dotenv';

// Load both environment files
config({ path: '.env.local' });
config({ path: '.env.prod' });
config({ path: '.env' });

const isDev = process.env.NODE_ENV === 'development';

export const Envs = {
    DATABASE_URL: isDev ? process.env.DEV_DATABASE_URL! : process.env.DATABASE_URL!,
    BETTER_AUTH_URL: isDev ? process.env.DEV_BETTER_AUTH_URL! : process.env.BETTER_AUTH_URL!,
    BETTER_AUTH_SECRET: isDev ? process.env.DEV_BETTER_AUTH_SECRET! : process.env.BETTER_AUTH_SECRET!,
    POLAR_ACCESS_TOKEN: isDev ? process.env.DEV_POLAR_ACCESS_TOKEN! : process.env.POLAR_ACCESS_TOKEN!,
    POLAR_WEBHOOK_SECRET: isDev ? process.env.DEV_POLAR_WEBHOOK_SECRET! : process.env.POLAR_WEBHOOK_SECRET!,
    UPSTASH_VECTOR_REST_URL: isDev ? process.env.DEV_UPSTASH_VECTOR_REST_URL! : process.env.UPSTASH_VECTOR_REST_URL!,
    UPSTASH_VECTOR_REST_TOKEN: isDev ? process.env.DEV_UPSTASH_VECTOR_REST_TOKEN! : process.env.UPSTASH_VECTOR_REST_TOKEN!,
    TOGETHER_API_KEY: isDev ? process.env.DEV_TOGETHER_API_KEY! : process.env.TOGETHER_API_KEY!,
    GITHUB_CLIENT_ID: isDev ? process.env.DEV_GITHUB_CLIENT_ID! : process.env.GITHUB_CLIENT_ID!,
    GITHUB_CLIENT_SECRET: isDev ? process.env.DEV_GITHUB_CLIENT_SECRET! : process.env.GITHUB_CLIENT_SECRET!,
    DISCORD_CLIENT_ID: isDev ? process.env.DEV_DISCORD_CLIENT_ID! : process.env.DISCORD_CLIENT_ID!,
    DISCORD_CLIENT_SECRET: isDev ? process.env.DEV_DISCORD_CLIENT_SECRET! : process.env.DISCORD_CLIENT_SECRET!,
    GOOGLE_CLIENT_ID: isDev ? process.env.DEV_GOOGLE_CLIENT_ID! : process.env.GOOGLE_CLIENT_ID!,
    GOOGLE_CLIENT_SECRET: isDev ? process.env.DEV_GOOGLE_CLIENT_SECRET! : process.env.GOOGLE_CLIENT_SECRET!,
    NEXT_PUBLIC_BASE_API_URL: isDev ? process.env.NEXT_PUBLIC_DEV_BASE_API_URL! : process.env.NEXT_PUBLIC_BASE_API_URL!,
} as const;


export type Envs = typeof Envs;