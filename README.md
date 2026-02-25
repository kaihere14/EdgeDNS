# EdgeDNS  
**A modern, full‑stack DNS management platform with Google OAuth, PostgreSQL, Redis caching and a sleek React/Tailwind UI.**  

![Node.js](https://img.shields.io/badge/Node.js-20.x-green?logo=node.js) ![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react) ![Prisma](https://img.shields.io/badge/Prisma-7.2.0-purple) ![Docker](https://img.shields.io/badge/Docker-✓-blue?logo=docker) ![License](https://img.shields.io/badge/License-ISC-lightgrey)  

[Demo](#) • [Documentation](#) • [Issues](https://github.com/kaihere14/EdgeDNS/issues) • [Pull Requests](https://github.com/kaihere14/EdgeDNS/pulls)

---

## Overview  

EdgeDNS is a lightweight DNS record manager that lets you:

* **Create, read, update and delete** DNS zones and records via a clean web UI.  
* **Securely authenticate** users with Google OAuth 2.0 (session stored in HTTP‑only cookies).  
* **Persist data** in PostgreSQL using Prisma ORM, with **Redis** for fast lookup of frequently‑used records.  

Designed for developers, DevOps engineers, and small‑to‑medium teams that need a self‑hosted alternative to commercial DNS dashboards.

Current stable version: **v1.0.0** (released 2026‑02‑25)

---

## Features  

| Feature | Description | Status |
|---------|-------------|--------|
| **Google OAuth login** | One‑click sign‑in using a Google account; JWT stored in an HTTP‑only cookie. | ✅ Stable |
| **Domain CRUD** | Create, list, edit, delete DNS zones and individual records (A, CNAME, TXT, etc.). | ✅ Stable |
| **Redis cache** | Cached DNS lookups for sub‑second response times. | ✅ Stable |
| **Responsive UI** | React 19 + Tailwind 4 UI works on desktop and mobile. | ✅ Stable |
| **API versioning** | All endpoints prefixed with `/api/v1` (future‑proof). | ✅ Stable |
| **Docker support** | One‑command containers for dev and production. | ✅ Stable |
| **Rate limiting & audit logs** (planned) | Prevent abuse and keep change history. | 🚧 Beta |
| **Multi‑tenant support** (planned) | Isolate DNS zones per organization. | 🚧 Experimental |

---

## Tech Stack  

| Layer | Technology | Reason |
|-------|------------|--------|
| **Frontend** | React 19, Vite 7, Tailwind 4, Axios | Fast HMR, utility‑first styling, modern React APIs |
| **Backend** | Node 20, Express 5, JWT, Bcrypt, Cookie‑Parser, CORS | Minimalist, async‑first HTTP server |
| **Database** | PostgreSQL 15 + Prisma 7 (ORM) | Strong relational model, type‑safe queries |
| **Cache** | Redis 7 (via ioredis) | Low‑latency read‑through caching |
| **Auth** | Google OAuth 2.0 (passport‑style) | Secure, no password storage |
| **Containerisation** | Docker & Docker‑Compose | Consistent dev/prod environments |
| **CI/CD (optional)** | GitHub Actions (build, test, lint) | Automated quality gates |

---

## Architecture  

```
┌─────────────────────┐        ┌─────────────────────┐
│   React Frontend    │  HTTPS │   Express API       │
│ (client/ folder)    │◀──────▶│ (server/ folder)    │
└─────────▲───────────┘        └───────▲─────────────┘
          │                           │
          │                           │
          │                           │
   ┌──────┴───────┐           ┌───────┴───────┐
   │   Redis      │           │ PostgreSQL    │
   │ (cache)      │           │ (Prisma)      │
   └──────────────┘           └───────────────┘
```

* **client/** – Vite‑powered React app, Tailwind styling, API calls via Axios.  
* **server/** – Express server, routes split into `auth.routes.js` and `domain.routes.js`.  
* **prisma/** – Schema definition (`schema.prisma`) and migration files.  
* **db/** – Helper to initialise PostgreSQL connection (`sqlDB.js`).  

All code uses native ES modules (`"type": "module"`).

---

## Getting Started  

### Prerequisites  

| Tool | Minimum version |
|------|-----------------|
| Node.js | 20.x |
| npm | 10.x (or use `pnpm`/`yarn`) |
| Docker & Docker‑Compose | 2.20+ (optional, for containerised dev) |
| PostgreSQL | 15.x |
| Redis | 7.x |
| Google Cloud Console | OAuth client ID & secret |

### Installation (local development)

1. **Clone the repository**

   ```bash
   git clone https://github.com/kaihere14/EdgeDNS.git
   cd EdgeDNS
   ```

2. **Create a `.env` file in the `server/` directory**

   ```dotenv
   # Server
   PORT=3000
   DATABASE_URL=postgresql://postgres:password@localhost:5432/edgedns
   REDIS_URL=redis://localhost:6379
   JWT_SECRET=super-secret-key
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   FRONTEND_URL=http://localhost:5173   # Vite dev server
   ```

3. **Start PostgreSQL & Redis (Docker Compose recommended)**

   ```bash
   # From the repository root
   docker compose up -d postgres redis
   ```

   *If you prefer local installations, ensure the services are reachable via the URLs above.*

4. **Install server dependencies**

   ```bash
   cd server
   npm ci
   ```

5. **Run Prisma migrations & generate client**

   ```bash
   npx prisma migrate dev --name init   # creates tables
   npm run postinstall                 # runs `prisma generate`
   ```

6. **Start the backend in watch mode**

   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:3000/api`.

7. **Install client dependencies**

   ```bash
   cd ../client
   npm ci
   ```

8. **Run the frontend**

   ```bash
   npm run dev
   ```

   Open `http://localhost:5173` in your browser. You should see the EdgeDNS UI and be able to log in with Google.

### Verification  

* `curl http://localhost:3000/` → should return `Hello, World!`  
* Visiting the frontend should redirect you to Google sign‑in, then back to the dashboard.

---

## Usage  

### API Quick Start (cURL)

```bash
# 1️⃣ Login with Google (client handles the redirect flow)
# After successful login a cookie `token` is set.

# 2️⃣ List all domains (authenticated)
curl -X GET http://localhost:3000/api/domain \
  -H "Cookie: token=YOUR_JWT_COOKIE"

# 3️⃣ Create a new domain
curl -X POST http://localhost:3000/api/domain \
  -H "Content-Type: application/json" \
  -H "Cookie: token=YOUR_JWT_COOKIE" \
  -d '{
        "name": "example.com",
        "records": [
          { "type": "A", "value": "93.184.216.34", "ttl": 3600 }
        ]
      }'
```

### Frontend Example (React)

```jsx
import axios from "axios";
import { useEffect, useState } from "react";

function DomainList() {
  const [domains, setDomains] = useState([]);

  useEffect(() => {
    axios
      .get("/api/domain", { withCredentials: true })
      .then((res) => setDomains(res.data))
      .catch(console.error);
  }, []);

  return (
    <ul>
      {domains.map((d) => (
        <li key={d.id}>{d.name}</li>
      ))}
    </ul>
  );
}
```

The above component works out‑of‑the‑box because Vite proxies `/api/*` to `http://localhost:3000` (see `vite.config.js`).

---

## Development  

| Task | Command |
|------|---------|
| **Run backend with hot‑reload** | `cd server && npm run dev` |
| **Run frontend with hot‑reload** | `cd client && npm run dev` |
| **Lint the client** | `npm run lint` (from `client/`) |
| **Run Prisma Studio** | `npx prisma studio` |
| **Run tests** | *(none defined yet – add Jest/Mocha as needed)* |
| **Check code style** | `npm run lint` (client) & `npx eslint .` (server) |

### Code Style  

* **Client** – ESLint with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`.  
* **Server** – Standard Node.js style; feel free to add `eslint` if desired.

### Debugging Tips  

* Use `console.log` or `debug` statements; the server logs each request when `NODE_ENV=development`.  
* Prisma query logs can be enabled by adding `log: ["query", "info", "warn", "error"]` to the Prisma client initialization.  

---

## Deployment  

### Docker (recommended)

```yaml
# docker-compose.yml (root)
version: "3.9"
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: edgedns
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7
    ports:
      - "6379:6379"

  server:
    build: ./server
    env_file: ./server/.env
    depends_on:
      - postgres
      - redis
    ports:
      - "3000:3000"

  client:
    build: ./client
    env_file: ./client/.env
    depends_on:
      - server
    ports:
      - "5173:5173"

volumes:
  pgdata:
```

*Build & run*

```bash
docker compose up --build -d
```

The UI will be reachable at `http://localhost:5173`, API at `http://localhost:3000/api`.

### Production (Vercel / Render)

* **Frontend** – Deploy the `client/` folder to Vercel (static build). Set `VITE_API_URL` environment variable to your backend URL.  
* **Backend** – Deploy the `server/` folder to Render, Railway, or any Node‑compatible PaaS. Ensure the same environment variables as in the local `.env` are provided.

---

## API Documentation  

All endpoints are prefixed with `/api`. The server uses **cookie‑based JWT** authentication; include `withCredentials: true` in Axios or send the `token` cookie with `curl -b`.

### Auth  

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| `GET` | `/api/auth/google` | Initiates Google OAuth flow (handled by client). | ❌ |
| `GET` | `/api/auth/google/callback` | Google redirects here; server creates JWT cookie. | ❌ |
| `POST` | `/api/auth/logout` | Clears authentication cookie. | ✅ |

### Domain  

| Method | Endpoint | Body | Description | Protected |
|--------|----------|------|-------------|-----------|
| `GET` | `/api/domain` | – | List all domains belonging to the authenticated user. | ✅ |
| `POST` | `/api/domain` | `{ name, records[] }` | Create a new domain with optional DNS records. | ✅ |
| `GET` | `/api/domain/:id` | – | Retrieve a single domain with its records. | ✅ |
| `PUT` | `/api/domain/:id` | `{ name?, records? }` | Update domain name or its records. | ✅ |
| `DELETE` | `/api/domain/:id` | – | Delete a domain and all associated records. | ✅ |

#### Record schema (used inside `records[]`)

```json
{
  "type": "A | CNAME | TXT | MX | SRV",
  "name": "subdomain (optional, defaults to @)",
  "value": "IP address, hostname, or text",
  "ttl": 300   // seconds
}
```

### Error handling  

| HTTP Code | Meaning |
|-----------|---------|
| `400` | Validation error (missing fields, invalid record type) |
| `401` | Unauthorized – missing or invalid JWT |
| `403` | Forbidden – trying to access another user's domain |
| `404` | Not found – domain ID does not exist |
| `500` | Internal server error (see logs) |

All error responses follow:

```json
{
  "error": "Human‑readable message",
  "code": 400
}
```

---

## Contributing  

1. **Fork** the repository.  
2. **Create a feature branch** (`git checkout -b feat/awesome-feature`).  
3. **Install dependencies** (see *Getting Started*).  
4. **Make your changes** and ensure the app still builds (`npm run build`).  
5. **Write tests** (if applicable) and run `npm test`.  
6. **Commit** with a clear message (`git commit -m "feat: add rate‑limiting middleware"`).  
7. **Push** to your fork and open a **Pull Request** against `main`.  

### Code Review Guidelines  

* Follow the existing folder structure (`client/` for UI, `server/` for API).  
* Keep TypeScript out of the repo for now – all code is plain JavaScript/JSX.  
* Linting must pass (`npm run lint`).  
* Update the README if you add public‑facing features.  

---

## Troubleshooting  

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| `Error: connect ECONNREFUSED 127.0.0.1:5432` | PostgreSQL not running or wrong `DATABASE_URL`. | Start Docker compose or adjust URL. |
| `401 Unauthorized` on API calls | Missing `token` cookie or expired JWT. | Re‑login via Google; ensure `withCredentials: true`. |
| Tailwind styles not applying | Vite not picking up `tailwind.config.js`. | Run `npm run dev` from `client/` and verify `postcss` plugins. |
| Prisma schema out of sync | New migration not applied. | Run `npx prisma migrate dev`. |
| CORS error in browser | `FRONTEND_URL` mismatch. | Set `FRONTEND_URL` in `.env` to the exact dev URL (`http://localhost:5173`). |

For more help, open an issue or join the **#support** channel in the repository’s Discussions.

---

## Roadmap  

| Milestone | Target | Notes |
|-----------|--------|-------|
| **v1.1** | Rate limiting, audit logs | Prevent abuse, add change history. |
| **v2.0** | Multi‑tenant SaaS mode | Separate organizations, custom domains. |
| **v2.1** | Webhooks for DNS changes | Integrate with external services (Cloudflare, Route53). |
| **v3.0** | Full TypeScript migration | Better developer experience and safety. |

Contributions that align with any of the above are especially welcome!

---

## License & Credits  

**License:** ISC – see the [LICENSE](LICENSE) file.  

**Author:** Kaihere14 (GitHub: [kaihere14](https://github.com/kaihere14))  

**Contributors:** (maintained automatically by GitHub)  

**Acknowledgments**  

* **Prisma** – for the type‑safe ORM.  
* **Tailwind CSS** – for rapid UI development.  
* **Google OAuth** – for secure authentication.  
* **ioredis** – for performant Redis client.  

---