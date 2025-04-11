import prometheus from 'prom-client'

export const httpRequestDuration = new prometheus.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status'],
    buckets: [0.1, 0.5, 1, 2, 5]
})

export const jobCounter = new prometheus.Counter({
    name: 'jobs_processed_total',
    help: 'Total number of jobs processed',
    labelNames: ['type', 'status']
});