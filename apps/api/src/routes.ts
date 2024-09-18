import authRoutes from '@/modules/auth/auth.route.js';
import { Router, type Response } from 'express';

const router: ReturnType<typeof Router> = Router();

router.get('/', (_, res: Response) => {
  res.status(200).json({
    status: 'Success',
    message: 'Welcome to WMS API👋',
  });
});

router.use('/', authRoutes);

export default router;
