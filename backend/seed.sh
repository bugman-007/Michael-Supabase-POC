#!/bin/bash
# Wait for Postgres to be ready
echo "Waiting for Postgres..."
until pg_isready -h db -p 5432; do
  sleep 1
done

echo "Seeding database..."
psql -h db -U postgres -d postgres -f /app/backend/assets.sql
psql -h db -U postgres -d postgres -f /app/backend/sessions.sql
psql -h db -U postgres -d postgres -f /app/backend/readings.sql
psql -h db -U postgres -d postgres -f /app/backend/seed.sql
echo "Database seeded!"
