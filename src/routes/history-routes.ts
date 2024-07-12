import { Router } from 'express';

import { getAll } from '../controllers/operation-history-controller';

const router = Router();

router.get('/history', getAll);

export default router;
