---

### ✅ 3. Prisma Seed Script / Migration

Inside your `movie-backend/prisma/schema.prisma`, you’ve defined models.

Now add a seed script to populate sample data:

---

#### `prisma/seed.js`

```js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.movie.createMany({
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
}

main()
  .then(() => {
    console.log('✅ Seed data inserted');
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
