require('dotenv').config();
import appRoot from 'app-root-path';

export const PORT = process.env.PORT;
export const ROOT_DIR = appRoot;
export const VIEWS_DIR = `${ROOT_DIR}/views`;
export const STATIC_PATH = '/static';
export const MONGO_HOST = process.env.MONGO_HOST;
export const MONGO_PORT = process.env.MONGO_PORT;
export const DB_NAME = 'tree-view';
export const MONGO_URI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${DB_NAME}`;
