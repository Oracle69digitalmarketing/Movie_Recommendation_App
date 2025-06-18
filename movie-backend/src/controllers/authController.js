import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateToken } from '../utils/generateToken.js';
import { isValidEmail } from '../utils/validateEmail.js';
import { handleError } from '../utils/handleError.js';

const prisma = new PrismaClient();

export const register = async (req, res) => {
  const { email, password, name } = req.body;

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    const token = generateToken(user);

    res.status(201).json({ user, token });
  } catch (err) {
    handleError(res, err, 'Failed to register user');
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user);

    res.status(200).json({ user, token });
  } catch (err) {
    handleError(res, err, 'Login failed');
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    res.status(200).json(user);
  } catch (err) {
    handleError(res, err, 'Failed to fetch profile');
  }
};

export const updateProfile = async (req, res) => {
  const { name, password } = req.body;

  try {
    const updateData = {};
    if (name) updateData.name = name;
    if (password) updateData.password = await bcrypt.hash(password, 10);

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: updateData,
    });

    res.status(200).json(user);
  } catch (err) {
    handleError(res, err, 'Profile update failed');
  }
};
