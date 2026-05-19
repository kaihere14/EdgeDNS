# EdgeDNS  
**A modern DNS management platform with Google OAuth, PostgreSQL, Redis caching, and a React/Tailwind UI.**  

![Node.js](https://img.shields.io/badge/Node.js-20.x-green?logo=node.js) ![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react) ![Prisma](https://img.shields.io/badge/Prisma-7.2.0-purple) ![Docker](https://img.shields.io/badge/Docker-✓-blue?logo=docker) ![License](https://img.shields.io/badge/License-ISC-lightgrey)  

[Demo](#) • [Documentation](#) • [Issues](https://github.com/kaihere14/EdgeDNS/issues) • [Pull Requests](https://github.com/kaihere14/EdgeDNS/pulls)

---

## Overview  

EdgeDNS is a self-hosted DNS management platform for developers and DevOps teams. Key features include:  
- **CRUD operations** for DNS zones and records (A, CNAME, TXT, etc.)  
- **Secure authentication** via Google OAuth 2.0 with HTTP-only JWT cookies  
- **High-performance architecture** using PostgreSQL (Prisma ORM) and Redis caching  
- **Responsive UI** built with React and Tailwind CSS  

Current stable version: **v1.0.0** (2026-02-25)

---

## Features  

| Feature | Status | Description |
|---------|--------|-------------|
| Google OAuth 2.0 | ✅ Stable | Secure, passwordless login with session cookies |
| Domain Management | ✅ Stable | Create/edit DNS zones and records |
| Redis Caching | ✅ Stable | Sub-second DNS lookup performance |
| API Versioning | ✅ Stable | `/api/v1` endpoints for future compatibility |
| Docker Support | ✅ Stable | Single-command container deployment |
| Rate Limiting | 🚧 Beta | Planned abuse prevention |
| Multi-tenancy | 🚧 Experimental | Organization-level isolation (planned) |

---

## Tech Stack  

**Core Components**  
- **Frontend**: React 19 + Vite 7 + Tailwind 4  
- **Backend**: Node.js 20 + Express 5 + Prisma 7  
- **Database**: PostgreSQL 15  
- **Caching**: Redis 7 via ioredis  
- **Auth**: Google OAuth 2.0 (JWT cookies)  
- **Deployment**: Docker/Docker Compose  

**Development Tools**  
- ESLint for code quality  
- GitHub Actions for CI/CD  

---

## Architecture  

```
┌───────────────┐        ┌───────────────┐
│   React UI    │  HTTPS │   Express API │
└───────┬───────┘        └───────┬───────┘
        │                           │
        │                           │
        ▼                           ▼
┌───────────────┐           ┌───────────────┐
│    Redis      │           │  PostgreSQL   │
│  (Caching)    │           │  (Prisma ORM) │
└───────────────┘           └───────────────┘
```

**Key Components**  
- `client/` – Vite-powered React frontend with Axios API calls  
- `server/` – Express API with modular route handlers  
- `prisma/` – Database schema and migrations  
- `docker-compose.yml` – Production-ready container setup  

---

## Getting Started  

### Prerequisites  
- Node.js 20.x  
- PostgreSQL 15.x  
- Redis 7.x  
- Google OAuth credentials (Client ID/Secret)  

### Local Development  

1. **Clone the repo**  
   ```bash
   git clone https://github.com/kaihere14/EdgeDNS.git
   cd EdgeDNS
   ```

2. **Create `.env` in `server/`**  
   ```dotenv
   PORT=3000
   DATABASE_URL=postgresql://postgres:password@localhost:5432/edgedns
   REDIS_URL=redis://localhost:6379
   JWT_SECRET=your-secret
   GOOGLE_CLIENT_ID=your-id
   GOOGLE_CLIENT_SECRET=your-secret
   FRONTEND_URL=http://localhost:5173
   ```

3. **Start services**  
   ```bash
   docker compose up -d postgres redis
   cd server && npm ci
   npx prisma migrate dev --name init
   npm run dev
   ```

4. **Run frontend**  
   ```bash
   cd client && npm ci && npm run dev
   ```

Access the UI at [http://localhost:5173](http://localhost:5173).

---

## API Documentation  

All endpoints require authentication via JWT cookie. Use `withCredentials: true` in requests.

### Auth Endpoints  
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/auth/google` | Initiate OAuth flow |
| `GET` | `/api/auth/google/callback` | Handle OAuth callback |
| `POST` | `/api/auth/logout` | Clear authentication cookie |

### Domain Endpoints  
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/domain` | List all domains |
| `POST` | `/api/domain` | Create a new domain |
| `GET` | `/api/domain/:id` | Retrieve domain details |
| `PUT` | `/api/domain/:id` | Update domain/records |
| `DELETE` | `/api/domain/:id` | Delete domain |

**Record Format**  
```json
{
  "type": "A | CNAME | TXT | MX | SRV",
  "name": "subdomain (optional)",
  "value": "IP/hostname/text",
  "ttl": 300
}
```

**Error Responses**  
```json
{
  "error": "Validation failed",
  "code": 400
}
```

---

## Deployment  

### Docker (Recommended)  
```yaml
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

  redis:
    image: redis:7

  server:
    build: ./server
    env_file: ./server/.env
    ports:
      - "3000:3000"

  client:
    build: ./client
    ports:
      - "5173:5173"
```

Run with:  
```bash
docker compose up --build -d
```

### Production Hosting  
- **Frontend**: Deploy `client/` to Vercel (set `VITE_API_URL`)  
- **Backend**: Use Render/Railway with environment variables  

---

## Contributing  

1. Fork the repo  
2. Create a feature branch: `git checkout -b feat/your-feature`  
3. Follow [Getting Started] for setup  
4. Submit a PR with clear commit messages  

**Guidelines**  
- Maintain existing folder structure  
- Ensure linting passes: `npm run lint`  
- Update documentation for public-facing changes  

---

## Troubleshooting  

| Issue | Solution |
|-------|----------|
| `ECONNREFUSED 5432` | Start PostgreSQL via Docker or verify connection URL |
| `401 Unauthorized` | Re-authenticate or check cookie handling |
| Tailwind styles missing | Run `npm run dev` in `client/` to rebuild CSS |
| Prisma schema mismatch | Apply migrations: `npx prisma migrate dev` |

---

## Roadmap  

| Version | Target | Features |
|---------|--------|----------|
| **v1.1** | Rate limiting, audit logs | Abuse prevention, change history |
| **v2.0** | Multi-tenancy | Organization isolation, custom domains |
| **v2.1** | Webhooks | Integration with external DNS services |
| **v3.0** | TypeScript migration | Improved type safety and developer experience |

---

## License & Credits  

**License**: ISC – see [LICENSE](LICENSE)  

**Author**: Kaihere14 ([GitHub](https://github.com/kaihere14))  

**Acknowledgments**  
- [Prisma ORM](https://prisma.io)  
- [Tailwind CSS](https://tailwindcss.com)  
- [Google OAuth](https://developers.google.com/identity)  
- [ioredis](https://github.com/luin/ioredis)