import express from 'express';
import httpStatus from 'http-status-codes';
import cors from 'cors';
import Resources from './resources';
import { APIConfig } from './serverConfig';

const server = express();

/**
 * @brief Body parser middleware
 */
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors())
/**
 * @brief Routes
 */
server.use('/', Resources);

/**
 * @brief Run server
 */
server.listen(APIConfig.port, APIConfig.host, () => {
	const { host, port } = APIConfig;
	console.log(`listens on http://${host}:${port}/.`);
});
