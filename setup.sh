touch .env.local
touch .env.prod
echo "DEV_DATABASE_URL=ADD_YOUR_KEY" >> .env.local
echo "DEV_BETTER_AUTH_URL=ADD_YOUR_KEY" >> .env.local
echo "DEV_BETTER_AUTH_SECRET=ADD_YOUR_KEY" >> .env.local
echo "DEV_POLAR_ACCESS_TOKEN=ADD_YOUR_KEY" >> .env.local
echo "DEV_POLAR_WEBHOOK_SECRET=ADD_YOUR_KEY" >> .env.local
# The following variables are of production.
echo "POLAR_WEBHOOK_SECRET=NO_NEED" >> .env.prod
echo "POLAR_ACCESS_TOKEN=NO_NEED" >> .env.prod
echo "BETTER_AUTH_SECRET=NO_NEED" >> .env.prod
echo "BETTER_AUTH_URL=NO_NEED" >> .env.prod
echo "DATABASE_URL=NO_NEED" >> .env.prod

touch apps/www/.env.local
echo "UPSTASH_VECTOR_REST_URL=ADD_YOUR_KEY" >> apps/www/.env.local
echo "UPSTASH_VECTOR_REST_TOKEN=ADD_YOUR_KEY" >> apps/www/.env.local
echo "TOGETHER_API_KEY=ADD_YOUR_KEY" >> apps/www/.env.local

# Install dependencies using Bun
echo "Installing dependencies..."
if ! command -v bun &> /dev/null
then
    echo "Bun is not installed. Installing Bun using npm..."
    npm install -g bun
fi
# Ensure the bun.lock file is present
if [ ! -f bun.lock ]; then
    echo "bun.lock file not found. Running 'bun install' to create it..."
fi

# Install dependencies
bun install
echo ">> Dependencies installed successfully."
echo ">> Created .env.local file in apps/www directory!"
echo ">> Created .env.local and .env.prod files in the root directory!"
echo ">> Setup complete. Please fill in the .env.local files with your keys."
echo ">> Note: The .env.prod file is not used in development, but you can use it for production."
echo ">> To run the application, use 'bun run dev' for development or 'bun run build' followed by 'bun start' for production."
