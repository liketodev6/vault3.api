import { IMainConfig } from ".";

const config: IMainConfig = {
  NODE_ENV: 'development',
  PORT: 5000,
  BASE_URL: 'http://localhost:5000/',
  ORIGIN: 'localhost:5000',
  MONGO_URL: 'mongodb://localhost:27017/vault3',
  PG_CONNECTION_STRING: '',
  JWT_UUID: '09112233445566778899',
  JWT_EXPIRE: '30d',
  SECRET: 'it-is-super-secret-key',
  SECRET_HASH: 'super-secret-wrong-key',
  SECRET_CONNECTOR: 'a$g',
  DB_SECRET: '$$db_secret_key'
};

export default config;