import request from 'supertest';
import app from '../index.js'; // Ensure your index.js exports the app
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

let token;

beforeAll(async () => {
  // Create a test user and log in to get JWT
  await prisma.user.create({
    data: {
      email: 'testuser@example.com',
      password: 'hashedpassword', // mock hash if needed
      role: 'user',
    },
  });

  const res = await request(app).post('/api/auth/login').send({
    email: 'testuser@example.com',
    password: 'password', // must match the mock hash logic
  });

  token = res.body.token;
});

afterAll(async () => {
  await prisma.review.deleteMany();
  await prisma.user.deleteMany();
  await prisma.$disconnect();
});

describe('POST /api/reviews', () => {
  it('should allow a user to create a review', async () => {
    const movie = await prisma.movie.create({
      data: {
        title: 'Review Movie',
        description: 'Test Movie',
        genre: 'Drama',
        releaseYear: 2021,
      },
    });

    const res = await request(app)
      .post('/api/reviews')
      .set('Authorization', `Bearer ${token}`)
      .send({
        movieId: movie.id,
        content: 'Great movie!',
        rating: 5,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.content).toBe('Great movie!');
  });
});
