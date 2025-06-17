import request from 'supertest';
import app from '../index.js'; // Make sure app is exported from index.js

describe('Auth Endpoints', () => {
  it('should register a user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: `test${Date.now()}@mail.com`,
      password: 'password123',
      name: 'Test User'
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
  });

  it('should fail login with wrong password', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'notexist@mail.com',
      password: 'wrong'
    });
    expect(res.statusCode).toBe(401);
  });
});
