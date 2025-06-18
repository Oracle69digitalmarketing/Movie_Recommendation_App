// __tests__/reviews.test.js

import request from 'supertest';
import app from '../index.js'; // Ensure index.js exports your Express app

describe('Reviews API', () => {
  let token;
  let movieId;
  let reviewId;

  beforeAll(async () => {
    // Register user
    await request(app).post('/api/auth/register').send({
      name: 'Review Tester',
      email: 'reviewer@example.com',
      password: 'testpass123',
    });

    // Login
    const loginRes = await request(app).post('/api/auth/login').send({
      email: 'reviewer@example.com',
      password: 'testpass123',
    });

    token = loginRes.body.token;

    // Create a movie to review
    const movieRes = await request(app)
      .post('/api/movies')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Movie',
        description: 'A movie to review',
        genre: 'Drama',
        releaseYear: 2020,
      });

    movieId = movieRes.body.id;
  });

  it('should create a review for a movie', async () => {
    const res = await request(app)
      .post(`/api/reviews/${movieId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        rating: 5,
        comment: 'Amazing movie!',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    reviewId = res.body.id;
  });

  it('should fetch all reviews for a movie', async () => {
    const res = await request(app).get(`/api/reviews/${movieId}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should delete a review by ID', async () => {
    const res = await request(app)
      .delete(`/api/reviews/${reviewId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(204);
  });
});
