import { db } from '@repo/db';
import { COOKIE_NAMES } from '@repo/shared/constants';
import { loginSchema, registerSchema } from '@repo/shared/schemas';
import argon2 from 'argon2';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { env } from '@/config/env.js';
import { config } from '@/config/index.js';

export const register = async (req: Request, res: Response) => {
  const body = registerSchema.parse(req.body);

  const { name, email, password } = body;

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (existingUser)
    return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await argon2.hash(password);

  const createdUser = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return res.status(201).json(createdUser);
};

export const login = async (req: Request, res: Response) => {
  const body = loginSchema.parse(req.body);

  const { email, password } = body;

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user)
    return res.status(400).json({ message: 'Invalid email or password' });

  const isPasswordCorrect = await argon2.verify(user.password, password);

  if (!isPasswordCorrect)
    return res.status(400).json({ message: 'Invalid email or password.' });

  const accessToken = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    env.ACCESS_TOKEN_SECRET
  );

  res.cookie(COOKIE_NAMES.ACCESS_TOKEN, accessToken, {
    httpOnly: true,
    secure: config.isProd,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: 'lax',
  });

  return res.status(200).json({
    message: 'Login successful',
  });
};

export const me = async (req: Request, res: Response) => {
  const { user } = req;

  if (!user)
    return res.status(401).json({
      message: 'Unauthorized!',
    });

  return res.status(200).json(user);
};
