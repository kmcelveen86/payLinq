# PayLinq

A card issuing, rewards generating platform built with Next.js, NextAuth, Prisma, and Stripe.

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, create a `.env` file in the root directory and add the necessary variables. (Ask Greg for the values)

### For New Developers

If you're setting up the project for the first time after cloning:

```bash
npx prisma migrate dev
```

This will apply all existing migrations to your local database. You don't need to create a new migration when first setting up.

### For Schema Changes

When making changes to the database schema, create a new migration:

```bash
npx prisma migrate dev --name descriptive_name
```

Use incremental naming (e.g., 001_initial, 002_add_profiles, 003_update_fields).

Then, run the dev server:

```bash
npm run dev
```

## Database Schema Changes

When modifying the database schema, follow these steps to ensure changes are properly implemented:

### 1. Edit schema.prisma file

Make your changes to the `prisma/schema.prisma` file. This could include:

- Adding new models
- Modifying existing models
- Adding or changing relations
- Updating field types or attributes

### 2. Create a migration

Generate a migration file to track your changes:

```bash
npx prisma migrate dev --name descriptive_name_of_change
```

Use an incremental naming convention (e.g., 002_add_user_profile, 003_update_address_fields).

### 3. Review the migration

Before confirming, Prisma will show you the SQL that will be executed. Review it to ensure:

- All expected changes are included
- No unexpected destructive changes are present
- Relations are set up correctly

### 4. Apply the migration

After reviewing, confirm to apply the migration to your development database.

### 5. Update Prisma Client

Prisma will automatically regenerate the client, but you can also run:

```bash
npx prisma generate
```

### 6. Verify the changes

Check that your changes were applied correctly:

```bash
npx prisma studio
```

### 7. Commit migration files

Always commit the generated migration files to your repository so other developers can apply the same changes.


_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________
_________________________________


### ALWAYS Update team members

Let team members know they need to pull the latest changes by running:

```bash
npx prisma migrate dev
```

This will apply any new migrations to their local development databases.

Deploying to **PRODUCTION**

When deploying to production, use:

```bash
npx prisma migrate deploy
```

This applies pending migrations without generating new ones.

## Viewing Database

To view the current state of the database:

```bash
npx prisma studio
```

Or run:

```bash
npm run view-db
```


## NGROK setup

```bash
ngrok http merchant.localhost:3000
```
1. Copy the https url (the https://ea083d0f72ad.ngrok-free.app part)
 a. e.g. `Forwarding                    https://ea083d0f72ad.ngrok-free.app -> http://merchant.localhost:3000`
2. Head over to https://dashboard.clerk.com/apps/app_2uzhP1BYKXIfrKesJa0ZmkeVs3d/instances/ins_2uzhP7uo9uS9zernvAN68G1cI2A/webhooks or go to clerk dashboard and search "webhooks".
3. Add the https url to the Webhooks section and append `/api/webhooks/clerk` to it e.g. `https://ea083d0f72ad.ngrok-free.app/api/webhooks/clerk`
4. copy the webhook signing secret from the clerk dashboard and add it to the `SIGNING_SECRET` environment variable
5. restart the server if necessary.

## Deployment

The application is deployed on Vercel with a Neon PostgreSQL database. Environment variables are managed through Vercel's dashboard.

## Additional Resources

- [NextAuth Documentation](https://next-auth.js.org/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Neon Documentation](https://neon.tech/docs/)
