import { Router } from 'express';

import { getAll } from '../controllers/operation-history-controller';

const router = Router();

router.get('/all', getAll);

export default router;
