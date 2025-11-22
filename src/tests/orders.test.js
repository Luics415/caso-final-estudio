// src/tests/orders.test.js
const request = require('supertest');
const app = require('../index');

describe('Orders API - Integration (in-memory)', () => {
  let createdId;

  it('POST /api/orders -> 201', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({ customer: 'Juan', items: [{ sku: 'X1', qty: 2 }], total: 100 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    createdId = res.body.id;
  });

  it('GET /api/orders/:id -> 200', async () => {
    const res = await request(app).get(`/api/orders/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(createdId);
  });

  it('PUT /api/orders/:id -> 200', async () => {
    const res = await request(app).put(`/api/orders/${createdId}`).send({ status: 'paid' });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('paid');
  });

  it('DELETE /api/orders/:id -> 204', async () => {
    const res = await request(app).delete(`/api/orders/${createdId}`);
    expect(res.statusCode).toBe(204);
  });
});
