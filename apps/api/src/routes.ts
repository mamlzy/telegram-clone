import authRoutes from '@/modules/auth/auth.route.js';
import conversationRoutes from '@/modules/conversation/conversation.route.js';
import userRoutes from '@/modules/user/user.route.js';
import { Router, type Response } from 'express';

const router: ReturnType<typeof Router> = Router();

router.get('/', (_, res: Response) => {
  res.status(200).json({
    status: 'Success',
    message: 'Welcome to WMS API👋',
  });
});

router.use('/', authRoutes);
router.use('/users', userRoutes);
router.use('/conversations', conversationRoutes);

export default router;
