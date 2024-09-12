import { Response, Router } from 'express';

const router: ReturnType<typeof Router> = Router();

router.get('/', (_, res: Response) => {
  res.status(200).json({
    status: 'Success',
    message: 'Welcome to WMS API👋',
  });
});

export default router;
