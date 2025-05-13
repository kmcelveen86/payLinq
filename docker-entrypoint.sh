#!/bin/sh
set -e

# Always regenerate Prisma client on startup
echo "Generating Prisma client..."
npx prisma generate

# Then run the specified command
exec "$@"