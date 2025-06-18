// __tests__/watchlist.test.js

import request from 'supertest';
import app from '../index.js';

describe('Watchlist API', () => {
  let token;
  let movieId;
  let watchlistEntryId;

  beforeAll(async () => {
    // Register new user
    await request(app).post('/api/auth/register').send({
      name: 'Watch Tester',
      email: 'watch@example.com',
      password: 'testpass123',
    });

    // Login to get token
    const loginRes = await request(app).post('/api/auth/login').send({
      email: 'watch@example.com',
      password: 'testpass123',
    });

    token = loginRes.body.token;

    // Create a movie to add to watchlist
    const movieRes = await request(app)
      .post('/api/movies')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Watchable Movie',
        description: 'A movie to test watchlist',
        genre: 'Thriller',
        releaseYear: 2021,
      });

    movieId = movieRes.body.id;
  });

  it('should add a movie to the user\'s watchlist', async () => {
    const res = await request(app)
      .post(`/api/watchlists/${movieId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    watchlistEntryId = res.body.id;
  });

  it('should get the user\'s watchlist', async () => {
    const res = await request(app)
      .get('/api/watchlists')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should remove a movie from the watchlist', async () => {
    const res = await request(app)
      .delete(`/api/watchlists/${movieId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(204);
  });
});
