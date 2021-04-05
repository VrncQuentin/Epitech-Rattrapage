import { User } from '@prisma/client';

import * as models from './UserModels';
import UpdateDTO from "./UserDTO";


export async function getUser(id: string): Promise<User | null> {
	return models.getUser(id);
}

export async function createUser(id: string): Promise<User> {
	return models.createUser(id);
}

export async function updateUser(id: string, value: any): Promise<User | null> {
	return models.updateUser(id, value);
}
