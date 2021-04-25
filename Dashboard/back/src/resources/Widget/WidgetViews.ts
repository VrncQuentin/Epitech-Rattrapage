import { Router } from 'express';
import handler from 'express-async-handler';
import httpStatus from 'http-status-codes';

import * as controllers from './WidgetControllers';

const router = Router();

// Create a weather widget & connect it to its user
router.post(
	'/weather/:id',
	handler(async (req, res) => {
		const user = await controllers.createWeatherWidget(req.params.id, req.body);
		res.status(httpStatus.CREATED).send(user);
	}),
);

export default router;
