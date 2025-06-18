// __tests__/favorites.test.js
import request from 'supertest';
import app from '../index.js';

describe('Favorites API', () => {
  let token;
  let movieId;

  beforeAll(async () => {
    await request(app).post('/api/auth/register').send({
      name: 'Fav Tester',
      email: 'fav@example.com',
      password: 'testpass123',
    });

    const loginRes = await request(app).post('/api/auth/login').send({
      email: 'fav@example.com',
      password: 'testpass123',
    });

    token = loginRes.body.token;

    const movieRes = await request(app)
      .post('/api/movies')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Favorite Movie',
        description: 'Testing favorites',
        genre: 'Drama',
        releaseYear: 2022,
      });

    movieId = movieRes.body.id;
  });

  it('should add a movie to favorites', async () => {
    const res = await request(app)
      .post(`/api/favorites/${movieId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should get user\'s favorite movies', async () => {
    const res = await request(app)
      .get('/api/favorites')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should remove a movie from favorites', async () => {
    const res = await request(app)
      .delete(`/api/favorites/${movieId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(204);
  });
});
