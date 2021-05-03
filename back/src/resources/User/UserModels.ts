import { User } from '@prisma/client';
import db from '../../serverDatabase';

export async function getUser(id: string): Promise<User | null> {
	return db.user.findUnique({
		where: {
			id,
		},
		include: {
			weather: true,
			github: true,
			spacex: true
		},
	});
}

export async function createUser(id: string, token: string): Promise<User> {
	return await db.user.create({
		data: {
			id: id,
			accessToken: token,
			weather: {},
			github: {},
			spacex: {}
		},
		include: {
			weather: true,
			github: true,
			spacex: true
		}
	})
}

export async function updateUser(id: string, value: any): Promise<User | null> {
	console.log(value)
	return db.user.update({
		where: {
			id,
		},
		data: value,
		include: {
			weather: true,
			github: true,
			spacex: true
		}
	});
}
