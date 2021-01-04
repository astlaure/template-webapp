import { Sequelize } from 'sequelize';
import databaseConfig from './database.config';

const database = new Sequelize(databaseConfig[process.env.NODE_ENV!]);

export default database;
