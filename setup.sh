touch .env.local
touch .env.prod
echo "IS_DEV_MODE=ADD_YOUR_KEY" >> .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:3000" >> .env.local
echo "DATABASE_URL=your_database_url" >> .env.local
echo "JWT_SECRET=your_jwt_secret" >> .env.local
echo "REDIS_URL=your_redis_url" >> .env.local
