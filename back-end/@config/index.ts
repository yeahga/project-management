import appRoot from 'app-root-path';

export const PORT = 8877;
export const ROOT_DIR = appRoot;
export const VIEWS_DIR = `${ROOT_DIR}/views`;
export const STATIC_PATH = '/static';
export const MONGO_HOST = 'localhost';
export const MONGO_PORT = '27017';
export const DB_NAME = 'tree-view';
export const MONGO_URI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${DB_NAME}`;
