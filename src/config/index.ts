import {config} from 'dotenv';
config();

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const {
  NODE_ENV,
  SERVER_PORT,
  DB_MIGRATE_ON_START,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_READ_HOST,
  DB_PORT,
  DB_DATABASE,
  LOG_FORMAT,
  LOG_DIR,
  SECRET_KEY,
  ORIGIN,
} = process.env;
