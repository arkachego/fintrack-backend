// Libraries
import path from 'path';

// Types
import type { Knex } from 'knex';

const getScriptsPath = () => {
  const pathParts = __dirname.split(path.sep);
  pathParts[pathParts.length] = 'scripts';
  return pathParts.join(path.sep);
};

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || "5432"),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: getScriptsPath(),
      extension: 'ts',
    },
  },
};

export default config;
