import request from 'supertest';
import app from '../index.js';

describe('Movie Endpoints', () => {
  it('should fetch all movies', async () => {
    const res = await request(app).get('/api/movies');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should not allow movie creation without auth', async () => {
    const res = await request(app).post('/api/movies').send({
      title: 'Test Movie',
      description: 'Description',
      genre: 'Action',
      releaseYear: 2024
    });
    expect(res.statusCode).toBe(401); // No token
  });
});
