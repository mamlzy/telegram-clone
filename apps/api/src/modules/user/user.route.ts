import { authenticateUser } from '@/middleware/authenticate-user.js';
import { Router } from 'express';

import { tryCatch } from '@/lib/try-catch.js';
import { getAll } from './user.controller.js';

const router = Router();

//! me
router.get('/', authenticateUser, tryCatch(getAll));

export default router;
