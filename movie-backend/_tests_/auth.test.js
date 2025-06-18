import request from 'supertest';
import app from '../index.js'; // ensure index.js exports the Express app

describe('Auth Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'TestUser',
      email: 'newuser@example.com',
      password: 'testpass123',
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  it('should log in an existing user', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'newuser@example.com',
      password: 'testpass123',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
