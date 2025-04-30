#!/bin/bash
set -e

# Copy over .env.railway as base
cp .env.railway .env

# Override Railway DATABASE_URL with direct PG variables if available
if [ ! -z "$PGHOST" ] && [ ! -z "$PGPORT" ] && [ ! -z "$PGDATABASE" ] && [ ! -z "$PGUSER" ] && [ ! -z "$PGPASSWORD" ]; then
  echo "Setting up PostgreSQL connection variables..."
  
  # Update the .env file with actual PostgreSQL variables
  sed -i "s|DB_HOST=.*|DB_HOST=$PGHOST|g" .env
  sed -i "s|DB_PORT=.*|DB_PORT=$PGPORT|g" .env
  sed -i "s|DB_DATABASE=.*|DB_DATABASE=$PGDATABASE|g" .env
  sed -i "s|DB_USERNAME=.*|DB_USERNAME=$PGUSER|g" .env
  sed -i "s|DB_PASSWORD=.*|DB_PASSWORD=$PGPASSWORD|g" .env
  
  echo "Database configuration updated."
fi

# Clear config cache
php artisan config:clear
php artisan cache:clear

# Run migrations
php artisan migrate --force

# Start server
php artisan serve --host=0.0.0.0 --port=${PORT:-8080} 