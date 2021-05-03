import { Router } from 'express';

import User from './User/UserViews';
import Widget from './Widget/WidgetViews';

const router = Router();

router.use('/user', User);
router.use('/widget', Widget)

export default router;
