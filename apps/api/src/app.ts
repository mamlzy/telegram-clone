import url from 'url';
import { globalErrorHandler } from '@/middleware/global-error-handler.js';
import { notFound } from '@/middleware/not-found.js';
import { auth } from '@repo/shared/lib/auth';
import { toNodeHandler } from 'better-auth/node';
import cookies from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

import { config } from './config/index.js';
import api from './routes.js';

dotenv.config();

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app: ReturnType<typeof express> = express();

//! middlewares
app.use(express.static('public'));
app.use((req, res, next) => {
  if (!req.path.startsWith('/api/auth/')) {
    express.json()(req, res, next);
  } else {
    next();
  }
});

app.use(cookies());
app.use(morgan('dev'));
app.use(
  cors({
    origin: config.corsOrigins,
    credentials: true,
  })
);

//! routes
app.get('/', (_, res) => {
  res.json({
    message: '✨👋🌎🌍🌏✨',
  });
});
app.all('/api/auth/*', toNodeHandler(auth));
app.use('/api', api);

//! error handlings
app.use(notFound);
app.use(globalErrorHandler);

export default app;
