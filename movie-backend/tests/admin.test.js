import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../index.js'; // Ensure your Express app is exported in index.js
import dotenv from 'dotenv';

dotenv.config();

// Generate test tokens
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

describe('RBAC: Admin Route Access', () => {
  it('❌ should deny access without token', async () => {
    const res = await request(app).get('/api/admin/dashboard');
    expect(res.statusCode).toBe(401);
  });

  it('❌ should deny access for non-admin user', async () => {
    const token = generateToken({ id: 1, role: 'user' });
    const res = await request(app)
      .get('/api/admin/dashboard')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(403);
  });

  it('✅ should allow access for admin user', async () => {
    const token = generateToken({ id: 1, role: 'admin' });
    const res = await request(app)
      .get('/api/admin/dashboard')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Welcome Admin 👑');
  });
});
