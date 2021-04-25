import { User } from '@prisma/client';

import * as models from './UserModels';

export async function getUser(id: string): Promise<User | null> {
	return models.getUser(id);
}

export async function createUser(id: string, token: string): Promise<User> {
	return models.createUser(id, token);
}

export async function updateUser(id: string, value: any): Promise<User | null> {
	return models.updateUser(id, value);
}
