import request from 'supertest';
import app from '../index.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
let token;

beforeAll(async () => {
  await prisma.user.create({
    data: {
      email: 'watchlistuser@example.com',
      password: 'hashedpassword',
      role: 'user',
    },
  });

  const res = await request(app).post('/api/auth/login').send({
    email: 'watchlistuser@example.com',
    password: 'password',
  });

  token = res.body.token;
});

afterAll(async () => {
  await prisma.watchlist.deleteMany();
  await prisma.user.deleteMany();
  await prisma.movie.deleteMany();
  await prisma.$disconnect();
});

describe('POST /api/watchlists', () => {
  it('should allow a user to add a movie to their watchlist', async () => {
    const movie = await prisma.movie.create({
      data: {
        title: 'Watchlist Movie',
        description: 'Test Movie for Watchlist',
        genre: 'Action',
        releaseYear: 2022,
      },
    });

    const res = await request(app)
      .post('/api/watchlists')
      .set('Authorization', `Bearer ${token}`)
      .send({
        movieId: movie.id,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.movieId).toBe(movie.id);
  });
});
