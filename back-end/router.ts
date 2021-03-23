import { Router } from 'express';

import developersRouter from './components/developer/router';
import projectRouter from './components/project/router';
import managerRouter from './components/manager/router';

const router = Router();

router.use('/managers', managerRouter);
router.use('/projects', projectRouter);
router.use('/developers', developersRouter);

export default router;
