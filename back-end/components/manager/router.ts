import { Router } from 'express';

import {
  getAllManagers,
  createManager,
  getManagerById,
  updateManager,
} from './controller';

const router = Router();

router.get('/', getAllManagers);
router.post('/', createManager);
router.get('/:managerId', getManagerById);
router.patch('/:managerId', updateManager);

export default router;
