import request from 'supertest'
import { app } from '../src/app'

describe('Jobs API', () => {
    it('POST /jobs creates a job', async () => {
        const res = await request(app).post('/jobs').send({ type: 'test' })
        assert.equal(res.status, 201);
        assert.equal(res.body.type, 'test');
    })
})