import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Sample movies
  const movie1 = await prisma.movie.upsert({
    where: { title: 'Inception' },
    update: {},
    create: {
      title: 'Inception',
      description: 'Mind-bending thriller by Christopher Nolan.',
      genre: 'Sci-Fi',
      releaseYear: 2010,
    },
  });

  const movie2 = await prisma.movie.upsert({
    where: { title: 'The Matrix' },
    update: {},
    create: {
      title: 'The Matrix',
      description: 'Neo discovers the truth about reality.',
      genre: 'Action',
      releaseYear: 1999,
    },
  });

  // Sample users
  const user1 = await prisma.user.upsert({
    where: { email: 'user1@example.com' },
    update: {},
    create: {
      email: 'user1@example.com',
      password: 'hashedpassword1',
      role: 'user',
    },
  });

  // Sample review
  await prisma.review.upsert({
    where: { id: 1 },
    update: {},
    create: {
      userId: user1.id,
      movieId: movie1.id,
      rating: 5,
      comment: 'Amazing movie!',
    },
  });

  // Sample watchlist entry
  await prisma.watchlist.upsert({
    where: { id: 1 },
    update: {},
    create: {
      userId: user1.id,
      movieId: movie2.id,
    },
  });

  console.log('✅ Seed data inserted');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
