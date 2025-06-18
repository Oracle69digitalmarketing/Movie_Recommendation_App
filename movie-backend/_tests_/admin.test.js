// __tests__/admin.test.js
import request from 'supertest';
import app from '../index.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Admin Access', () => {
  let userToken;
  let adminToken;

  beforeAll(async () => {
    // Register regular user
    await request(app).post('/api/auth/register').send({
      name: 'Regular User',
      email: 'user@example.com',
      password: 'userpass123',
    });

    const userRes = await request(app).post('/api/auth/login').send({
      email: 'user@example.com',
      password: 'userpass123',
    });

    userToken = userRes.body.token;

    // Register admin user
    await request(app).post('/api/auth/register').send({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'adminpass123',
    });

    // Promote to admin in DB
    await prisma.user.update({
      where: { email: 'admin@example.com' },
      data: { role: 'admin' },
    });

    const adminRes = await request(app).post('/api/auth/login').send({
      email: 'admin@example.com',
      password: 'adminpass123',
    });

    adminToken = adminRes.body.token;
  });

  it('should deny access to non-admin user', async () => {
    const res = await request(app)
      .get('/api/admin/summary')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toBe(403);
  });

  it('should allow admin to access dashboard summary', async () => {
    const res = await request(app)
      .get('/api/admin/summary')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('users');
    expect(res.body).toHaveProperty('movies');
  });
});
