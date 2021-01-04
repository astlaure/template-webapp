import 'dotenv/config';
import { Options } from 'sequelize';

interface IDatabaseConfig {
  test: Options;
  development: Options;
  production: Options;
  [env: string]: Options;
}

const databaseConfig = {
  test: {
    storage: ':memory:',
    dialect: 'sqlite',
  },
  development: {
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    dialect: 'mysql',
    pool: {
      min: 2,
      mx: 10,
    },
  },
  production: {
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    dialect: 'mysql',
    pool: {
      min: 2,
      mx: 10,
    },
  },
} as IDatabaseConfig;

export default databaseConfig;
