import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Toggle DB verification
const VERIFY_FROM_DB = true;

const isAdmin = async (req, res, next) => {
  const user = req.user;

  if (!user?.id || !user?.role) {
    return res.status(401).json({ message: 'Invalid token payload' });
  }

  if (VERIFY_FROM_DB) {
    try {
      const foundUser = await prisma.user.findUnique({
        where: { id: user.id },
      });

      if (!foundUser || foundUser.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied: Admins only' });
      }

      next();
    } catch (err) {
      return res.status(500).json({ message: 'Authorization failed', error: err.message });
    }
  } else {
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }
    next();
  }
};

export default isAdmin;
