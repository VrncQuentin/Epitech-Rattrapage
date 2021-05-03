import { Router } from 'express';
import handler from 'express-async-handler';
import httpStatus from 'http-status-codes';

import * as controllers from './UserControllers';

const router = Router();

// Get user based on its id
router.get(
	'/:id',
	handler(async (req, res) => {
		const user = await controllers.getUser(req.params.id);
		if (user === null) {
			res.sendStatus(404)
		} else {
			res.send(user);
		}
	}),
);

// Create a user based on its firebase id
router.post(
	'/create/:id/:token',
	handler(async (req, res) => {
		const user = await controllers.createUser(req.params.id, req.params.token);
		res.status(httpStatus.CREATED).send(user);
	}),
);

// Update a user based on its id
router.post(
	'/update/:id',
	handler(async (req, res) => {
		const user = await controllers.updateUser(req.params.id, req.body);
		res.send(user);
	}),
);

export default router;
