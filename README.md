# App Architecture

## Tech Stack

Frontend: React.js (with TypeScript, Vite, ESLint, Prettier)
Data Visualization: Chart.js or D3.js for interactive charts
Backend: NestJS (TypeScript)
Database: MySQL (via Prisma ORM)
Deployment: Docker, Kubernetes (optional for scalability)
CI/CD: GitHub Actions for automation
Testing: Jest for backend, React Testing Library for frontend

## System Architecture

### Frontend

- Fetches traffic data via REST API.
- Displays data using two interactive charts (Country-wise Traffic & Vehicle Type Distribution).
- Implements responsiveness using TailwindCSS or Material-UI.

### Backend (NestJS)

- Provides RESTful API endpoints (/traffic/countries, /traffic/vehicle-types).
- Uses Prisma ORM for database access.
- Implements rate limiting to handle scaling.

### Database (MySQL)

- Stores traffic data.
- Allows updates through an API endpoint (/traffic/update).

### Scalability Plan

#### From 5 RPS to 50 RPS

- Use caching (Redis) for frequently accessed queries.
- Implement connection pooling in MySQL.

##### From 50 RPS to 500 RPS

- Use horizontal scaling with multiple backend instances (via Kubernetes).
- Load balance with NGINX or AWS ALB.
- Implement database read replicas for performance.

### API Docs

- <http://localhost:3000/api/docs>

### How run service locally

Make sure ports 3306, 3000 and 6379 should be free other wise you have update in docker-compose.yml file

``sh
docker compose up -d
``

### Seed data (default data)

``sh
docker compose exec backend yarn prisma db seed
``
