/* eslint-disable @typescript-eslint/no-explicit-any */
import knex, {Knex} from 'knex';
import {logger} from '../utilities/logger/winston_logger';
import pg from 'pg';
import pgArray from 'postgres-array';
import {
  DB_MIGRATE_ON_START,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_READ_HOST,
  DB_PORT,
  DB_DATABASE,
} from '../config/index';

pg.types.setTypeParser(1016, text =>
  pgArray.parse(text, value => {
    return parseInt(value);
  })
);

pg.types.setTypeParser(pg.types.builtins.INT8, (value: string) => {
  return parseInt(value);
});

pg.types.setTypeParser(pg.types.builtins.FLOAT8, (value: string) => {
  return parseFloat(value);
});

pg.types.setTypeParser(pg.types.builtins.NUMERIC, (value: string) => {
  return parseFloat(value);
});
export class DB {
  static write: any;
  static read: any;
}
export async function pingdb() {
  try {
    await DB.write.raw("SELECT 'db connected' AS status");
    await DB.read.raw("SELECT 'db connected' AS status");
  } catch (error) {
    return false;
  }
  return true;
}

async function seed() {
  const seedConfig = {
    directory: __dirname + '/seeds',
  };
  logger.info('Running seed...');
  try {
    await DB.write.seed.run(seedConfig).then((result: {}[][]) => {
      logger.info('Ran Seed', result);
    });
    logger.info('Ran seed: Finish ');
  } catch (error) {
    logger.error('Database seed Error!!', error);
    throw error;
  }
}
async function migrate() {
  const migrationConfig = {
    directory: __dirname + '/migrations',
  };
  logger.info('Running migrations...');
  try {
    await DB.write.migrate.latest(migrationConfig).then((result: {}[][]) => {
      const log = result[1];
      if (!log.length) {
        logger.info('Database is already up to date');
      } else {
        logger.info('Ran migrations:>> ');
        for (let i = 0; i < log.length; i++) {
          logger.info(i + 1 + '=> ' + log[i]);
        }
        logger.info('Ran Migration Count: ', result[0]);
      }
    });
    logger.info('Ran migrations: Finish ');
    await seed();
  } catch (error) {
    logger.error('Database migration Error!!', error);
    throw error;
  }
}

export async function connectdb() {
  try {
    logger.info('Database connecting... ');

    const configOptions: Knex.Config = {
      client: 'pg',
      connection: {
        user: DB_USER,
        password: DB_PASSWORD,
        host: DB_HOST,
        port: +DB_PORT,
        database: DB_DATABASE,
      },
      migrations: {
        directory: './data/migrations',
        schemaName: 'public',
        disableMigrationsListValidation: true,
        extension: 'js',
        loadExtensions: ['.js', '.ts'],
      },
      seeds: {
        directory: './data/seeds',
        extension: 'js',
        loadExtensions: ['.js', '.ts'],
      },
      searchPath: ['knex', 'public'],
    };
    DB.write = knex(configOptions);
    await DB.write.raw("SELECT 'write db connected' AS status");
    logger.info('Write Database connected');

    (configOptions.connection as Knex.PgConnectionConfig).host = DB_READ_HOST;
    DB.read = knex(configOptions);
    await DB.read.raw("SELECT 'readt db connected' AS status");
    logger.info('Read Database connected');

    if (DB_MIGRATE_ON_START?.toLocaleLowerCase() === 'true') {
      await migrate();
    }
    return true;
  } catch (error) {
    logger.error('Database Connection Error!!', error);
    throw error;
  }
}
export async function getTransaction(): Promise<Knex.Transaction<any, any[]>> {
  const trx: Knex.Transaction = await DB.write.transaction();
  return trx;
}
