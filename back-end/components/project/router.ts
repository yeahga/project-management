import { Router } from 'express';

import {
  getAllProjects,
  createProject,
  getProjectById,
  updateProject,
} from './controller';

const router = Router();

router.get('/', getAllProjects);
router.post('/', createProject);
router.get('/:projectId', getProjectById);
router.put('/:projectId', updateProject);

export default router;
