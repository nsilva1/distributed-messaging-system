# Distributed Messaging System

_A fault-tolerant job processing system with horizontal scaling capabilities_

---

## 1. Running the System

### Quick Start (Development)

```bash
# 1. Clone and setup
git clone https://github.com/nsilva1/distributed-messaging-system.git
cd distributed-messaging-system
yarn install

# 2. Start dependencies (Redis)
docker-compose up -d redis

# 3. In separate terminals:
yarn start          # Starts API server (PORT 3000)
yarn run start:worker  # Starts job worker

# 4. Using docker compose (API + Workers + Redis)
docker-compose up --build --scale worker=3      #Launches 3 workers

```

## 2. Architecture & Design Decisions

```mermaid
    User->>API: POST /jobs {type: "image-resize"}
    API->>Redis: Add job to queue
    API->>Postgres: Store metadata (status="queued")
    Redis->>Worker: Pull job
    Worker->>API: GET /jobs/123/claim
    Worker->>Worker: Process image (2s)
    Worker->>Postgres: Update status="completed"
    API->>User: 200 OK {result: IPFS_CID}
```

### Key Design Choices

- **Bull Queue System** Chosen over RabbitMQ for native Redis integration and automatic retries. Built-in backoff strategy for failed jobs
- **Decoupled Workers** Workers are stateless processes that pull jobs from Redis. Automatic job re-queue if worker crashes (via Redis TTL)
- **Dual Storage Layer** Low-latency job queue and caching. Persistent job metadata

## 3. Scaling Beyond Prototype

### Horizontal Scaling

| Component   | Scaling Strategy             | Tool                               |
| ----------- | ---------------------------- | ---------------------------------- |
| API Servers | Load Balancer + Auto-Scaling | Kubernetes, NGINX                  |
| Workers     | Dynamic Worker Pool          | `docker-compose --scale worker=10` |
| Redis       | Redis Cluster                | Redis Sharding                     |
| Storage     | Read replicas                | PostgreSQL pooling                 |
