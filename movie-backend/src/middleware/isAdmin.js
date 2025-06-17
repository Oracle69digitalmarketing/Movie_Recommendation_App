import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const VERIFY_FROM_DB = false;

export const isAdmin = async (req, res, next) => {
  if (!req.user?.id || !req.user?.role) {
    return res.status(401).json({ message: 'Invalid token payload' });
  }

  if (VERIFY_FROM_DB) {
    try {
      const user = await prisma.user.findUnique({ where: { id: req.user.id } });
      if (!user || user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Access denied: Admins only' });
      }
      return next();
    } catch (err) {
      return res.status(500).json({ message: 'Authorization failed', error: err.message });
    }
  } else {
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }
    return next();
  }
};
