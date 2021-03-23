import { Router } from 'express';

import {
  getAllDevelopers,
  createDeveloper,
  getDeveloperById,
  updateDeveloper,
} from './controller';

const router = Router();

router.get('/', getAllDevelopers);
router.post('/', createDeveloper);
router.get('/:developerId', getDeveloperById);
router.put('/:developerId', updateDeveloper);

export default router;
