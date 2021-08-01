import dotenv from 'dotenv';
dotenv.config();

const configuration = {
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: 'src/migrations',
  },
  timezone: 'UTC',
};

export = configuration;
