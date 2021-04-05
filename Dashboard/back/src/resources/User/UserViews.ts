import { Router } from 'express';
import handler from 'express-async-handler';
import httpStatus from 'http-status-codes';

import * as controllers from './UserControllers';

const router = Router();

router.get(
	'/:id',
	handler(async (req, res) => {
		const user = await controllers.getUser(req.params.id);
		res.send(user);
	}),
);
router.post(
	'/:id',
	handler(async (req, res) => {
		const user = await controllers.createUser(req.params.id);
		res.status(httpStatus.CREATED).send(user);
	}),
);

router.post(
	'/update/:id',
	handler(async (req, res) => {
		const user = await controllers.updateUser(req.params.id, req.body);
		res.send(user);
	}),
);

export default router;
