import * as dotenv from "dotenv";
dotenv.config();

const env: string = process.env.NODE_ENV || 'production';
const mainConfig: IMainConfig = require(`./${env}`).default;

export interface IMainConfig {
  NODE_ENV: string;
  BASE_URL: string;
  ORIGIN: string;
  PORT: number;
  MONGO_URL: string;
  JWT_UUID: string;
  SECRET: string;
  JWT_EXPIRE: string;
  SECRET_HASH: string;
  SECRET_CONNECTOR: string;
  PG_CONNECTION_STRING: string;
  DB_SECRET: string;
}

export default mainConfig;