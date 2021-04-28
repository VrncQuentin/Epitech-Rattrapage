import { Router } from 'express';
import handler from 'express-async-handler';
import httpStatus from 'http-status-codes';

import * as controllers from './WidgetControllers';

const router = Router();

// Create a weather widget & connect it to its user
router.post(
	'/weather/:id',
	handler(async (req, res) => {
		const weather = await controllers.createWeatherWidget(req.params.id, req.body);
		res.status(httpStatus.CREATED).send(weather);
	}),
);
router.delete(
	'/weather/:id',
	handler(async (req, res) => {
		const weather = await controllers.deleteWeatherWidget(req.params.id);
		res.status(200).send(weather);
	}),
);

export default router;
