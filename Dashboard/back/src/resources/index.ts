import { Router } from 'express';

import User from './User/UserViews';

const router = Router();

router.use('/user', User);

export default router;
