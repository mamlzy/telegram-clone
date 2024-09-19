import { authenticateUser } from '@/middleware/authenticate-user.js';
import { Router } from 'express';

import { tryCatch } from '@/lib/try-catch.js';
import { login, me, register } from './auth.controller.js';

const router = Router();

//! register
router.post('/register', tryCatch(register));

//! login
router.post('/login', tryCatch(login));

//! me
router.get('/me', authenticateUser, tryCatch(me));

export default router;
