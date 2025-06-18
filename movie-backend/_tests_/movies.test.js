// __tests__/movies.test.js

import request from 'supertest';
import app from '../index.js'; // Make sure index.js exports the Express app

describe('Movies API', () => {
  let token = '';
  let createdMovieId;

  beforeAll(async () => {
    // Register and login to get a valid JWT token
    await request(app).post('/api/auth/register').send({
      name: 'MovieTester',
      email: 'movietester@example.com',
      password: 'testpass456',
    });

    const res = await request(app).post('/api/auth/login').send({
      email: 'movietester@example.com',
      password: 'testpass456',
    });

    token = res.body.token;
  });

  it('should create a new movie', async () => {
    const res = await request(app)
      .post('/api/movies')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Interstellar',
        description: 'Space adventure to save humanity.',
        genre: 'Sci-Fi',
        releaseYear: 2014,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    createdMovieId = res.body.id;
  });

  it('should fetch all movies', async () => {
    const res = await request(app).get('/api/movies');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get a specific movie by ID', async () => {
    const res = await request(app).get(`/api/movies/${createdMovieId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', createdMovieId);
  });

  it('should delete a movie by ID', async () => {
    const res = await request(app)
      .delete(`/api/movies/${createdMovieId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(204);
  });
});
