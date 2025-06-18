import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Clear old data
  await prisma.review.deleteMany();
  await prisma.watchlist.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.movie.deleteMany();
  await prisma.user.deleteMany();

  // Seed user
  const user = await prisma.user.create({
    data: {
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashed_test_password', // Replace with hashed if needed
      role: 'user',
    },
  });

  // Seed movies
  const movies = await prisma.movie.createMany({
    data: [
      {
        title: 'Inception',
        description: 'Mind-bending thriller by Christopher Nolan.',
        genre: 'Sci-Fi',
        releaseYear: 2010,
      },
      {
        title: 'The Matrix',
        description: 'Neo discovers the truth about reality.',
        genre: 'Action',
        releaseYear: 1999,
      },
    ],
  });

  const allMovies = await prisma.movie.findMany();

  // Seed reviews
  await prisma.review.createMany({
    data: [
      {
        userId: user.id,
        movieId: allMovies[0].id,
        rating: 5,
        comment: 'Amazing visuals and plot!',
      },
      {
        userId: user.id,
        movieId: allMovies[1].id,
        rating: 4,
        comment: 'Classic and mind-opening.',
      },
    ],
  });

  // Seed watchlist
  await prisma.watchlist.createMany({
    data: [
      { userId: user.id, movieId: allMovies[0].id },
      { userId: user.id, movieId: allMovies[1].id },
    ],
  });
}

main()
  .then(() => {
    console.log('✅ Seed data inserted');
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect();
  });
