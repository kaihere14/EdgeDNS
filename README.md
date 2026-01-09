**Project**

- **Name:** DNS Register
- **Description:** Full-stack app for DNS/subdomain registration with a React/Vite client and Node.js/Express server (Prisma + Postgres, Redis for sessions/caching).

**Repository Structure**

- **client**: front-end React app (Vite). See [client](client)
- **server**: back-end Node.js API with Prisma and Redis. See [server](server)

**Requirements**

- **Node.js:** 18+ recommended
- **Postgres:** Local or managed Postgres instance
- **Redis:** For session/cache (optional but recommended)

**Environment**
Create a `.env` file in `server/` with at least the following variables:

- `DATABASE_URL` : Postgres connection string
- `REDIS_URL` : Redis connection string (e.g. `redis://localhost:6379`)
- `JWT_SECRET` : Secret used to sign JWTs
- `PORT` : Port for the server (default 4000)

Example `.env` (do not commit):

```
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret
PORT=4000
```

**Setup & Install**

- Server

```
cd server
npm install
npx prisma generate
```

- Client

```
cd client
npm install
```

**Database / Migrations**

- Migrations live in `server/prisma/migrations/`.
- For local development you can run:

```
cd server
npx prisma migrate dev
```

For production deploys use `npx prisma migrate deploy`.

**Run (development)**

- Start server:

```
cd server
npm run dev
```

- Start client:

```
cd client
npm run dev
```

Run both in separate terminals. Optionally use a process manager or `concurrently` to run both together.

**API Routes (quick pointer)**

- Authentication: `server/src/routes/auth.routes.js`
- Domain/subdomain routes: `server/src/routes/domain.routes.js`

**Notable files**

- `server/src/middleware/verifyJwt.js` : JWT verification middleware
- `server/prisma/schema.prisma` : Prisma schema

**Development Notes**

- Keep secrets out of source control and use environment-specific `.env` files.
- If using Docker, set up Postgres and Redis services and point `DATABASE_URL` / `REDIS_URL` to those containers.

**Contributing**

- Open issues and PRs. Keep changes focused and include tests where appropriate.

**License**

- Add a license file if you plan to make this public.
