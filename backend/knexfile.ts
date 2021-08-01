import dotenv from 'dotenv';
import { Config } from 'knex';
dotenv.config();

const configuration: Config = {
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  },
  pool: {
    min: 1,
    max: 19,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: 'src/migrations',
  },
};

export = configuration;
