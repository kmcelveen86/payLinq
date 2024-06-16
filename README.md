## Getting Started

First, install deps:

```bash
npm install
```

Then, create a `.env` file in the root directory and add the necessary variables. (Ask Greg for the values)

Then migrate the database (each time you migrate the db ie. make changes, increase the name so next time it's 002, 003, etc.):

```bash
npx prisma migrate dev --name 001
```

Then, run the dev server

```bash
npm run dev
```
