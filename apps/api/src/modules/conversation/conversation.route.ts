import { authenticateUser } from '@/middleware/authenticate-user.js';
import { Router } from 'express';

import { tryCatch } from '@/lib/try-catch.js';
import { accessChat, getAllByUserId } from './conversation.controller.js';

const router = Router();

//! access chat
router.post('/access-chat', authenticateUser, tryCatch(accessChat));

//! get all by userId
router.get('/:userId/all', authenticateUser, tryCatch(getAllByUserId));

export default router;
