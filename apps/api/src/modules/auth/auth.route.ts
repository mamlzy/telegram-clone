import { Router } from 'express';

import { tryCatch } from '@/lib/try-catch.js';
import { login, register } from './auth.controller.js';

const router = Router();

//! register
router.post('/register', tryCatch(register));

//! login
router.post('/login', tryCatch(login));

export default router;
