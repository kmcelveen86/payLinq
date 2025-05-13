FROM node:20-alpine

# Install Python and build dependencies
RUN apk add --no-cache python3 make g++ gcc
RUN ln -sf python3 /usr/bin/python

WORKDIR /app

# Copy package files and prisma schema first
COPY package.json package-lock.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# Generate Prisma client during build
RUN npx prisma generate

# Set up a startup script
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Expose port
EXPOSE 3000

# Use the entrypoint script
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["npm", "run", "dev"]