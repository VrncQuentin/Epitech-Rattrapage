import { Router } from 'express';
import handler from 'express-async-handler';
import httpStatus from 'http-status-codes';

import * as controllers from './WidgetControllers';

const router = Router();

// Create a weather widget & connect it to its user
router.post(
	'/weather/:id',
	handler(async (req, res) => {
		console.log('create weather')
		const weather = await controllers.createWeatherWidget(req.params.id, req.body);
		res.status(httpStatus.CREATED).send(weather);
	}),
);

router.post(
	'/github/:id',
	handler(async (req, res) => {
		console.log('create github')
		const weather = await controllers.createGithubWidget(req.params.id, req.body);
		res.status(httpStatus.CREATED).send(weather);
	}),
);

router.post('/spacex/:id',
	handler(async (req, res) => {
		console.log('create spacex')
		const weather = await controllers.createSpaceXWidget(req.params.id, req.body);
		res.status(httpStatus.CREATED).send(weather);
	}),
);

router.delete(
	'/weather/:id',
	handler(async (req, res) => {
		console.log('delete weather')
		const weather = await controllers.deleteWeatherWidget(req.params.id);
		res.status(200).send(weather);
	}),
);

router.delete(
	'/github/:id',
	handler(async (req, res) => {
		console.log('delete github')
		const weather = await controllers.deleteGithubWidget(req.params.id);
		res.status(httpStatus.CREATED).send(weather);
	}),
);

router.delete(
	'/spacex/:id',
	handler(async (req, res) => {
		console.log('delete spacex')
		const weather = await controllers.deleteSpaceXWidget(req.params.id);
		res.status(httpStatus.CREATED).send(weather);
	}),
);


export default router;
