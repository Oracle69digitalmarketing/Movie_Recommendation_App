// tests/movies.test.js
import request from 'supertest';
import app from '../index.js'; // Ensure your app exports the Express instance
import dotenv from 'dotenv';
dotenv.config();

let token;

beforeAll(async () => {
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: 'admin@example.com', password: 'admin123' });

  token = res.body.token;
});

describe('Movie API Tests', () => {
  it('should fetch all movies', async () => {
    const res = await request(app).get('/api/movies');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create a movie', async () => {
    const res = await request(app)
      .post('/api/movies')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Interstellar',
        description: 'A space-time thriller.',
        genre: 'Sci-Fi',
        releaseYear: 2014,
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });
});
