import { get } from 'env-var';

const env = (key: string, required = true) => get(key).required(required);

export const APIConfig = {
	port: env('API_PORT').asPortNumber(),
	host: env('API_HOST').asString(),
};