"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransaction = exports.connectdb = exports.pingdb = exports.DB = void 0;
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-explicit-any */
const knex_1 = tslib_1.__importDefault(require("knex"));
const winston_logger_1 = require("../utilities/logger/winston_logger");
const pg_1 = tslib_1.__importDefault(require("pg"));
const postgres_array_1 = tslib_1.__importDefault(require("postgres-array"));
const index_1 = require("../config/index");
pg_1.default.types.setTypeParser(1016, text => postgres_array_1.default.parse(text, value => {
    return parseInt(value);
}));
pg_1.default.types.setTypeParser(pg_1.default.types.builtins.INT8, (value) => {
    return parseInt(value);
});
pg_1.default.types.setTypeParser(pg_1.default.types.builtins.FLOAT8, (value) => {
    return parseFloat(value);
});
pg_1.default.types.setTypeParser(pg_1.default.types.builtins.NUMERIC, (value) => {
    return parseFloat(value);
});
class DB {
}
exports.DB = DB;
async function pingdb() {
    try {
        await DB.write.raw("SELECT 'db connected' AS status");
        await DB.read.raw("SELECT 'db connected' AS status");
    }
    catch (error) {
        return false;
    }
    return true;
}
exports.pingdb = pingdb;
async function seed() {
    const seedConfig = {
        directory: __dirname + '/seeds',
    };
    winston_logger_1.logger.info('Running seed...');
    try {
        await DB.write.seed.run(seedConfig).then((result) => {
            winston_logger_1.logger.info('Ran Seed', result);
        });
        winston_logger_1.logger.info('Ran seed: Finish ');
    }
    catch (error) {
        winston_logger_1.logger.error('Database seed Error!!', error);
    }
}
async function migrate() {
    const migrationConfig = {
        directory: __dirname + '/migrations',
    };
    winston_logger_1.logger.info('Running migrations...');
    try {
        await DB.write.migrate.latest(migrationConfig).then((result) => {
            const log = result[1];
            if (!log.length) {
                winston_logger_1.logger.info('Database is already up to date');
            }
            else {
                winston_logger_1.logger.info('Ran migrations:>> ');
                for (let i = 0; i < log.length; i++) {
                    winston_logger_1.logger.info(i + 1 + '=> ' + log[i]);
                }
                winston_logger_1.logger.info('Ran Migration Count: ', result[0]);
            }
        });
        winston_logger_1.logger.info('Ran migrations: Finish ');
        await seed();
    }
    catch (error) {
        winston_logger_1.logger.error('Database migration Error!!', error);
        throw error;
    }
}
async function connectdb() {
    try {
        winston_logger_1.logger.info('Database connecting... ');
        const configOptions = {
            client: 'pg',
            connection: {
                user: index_1.DB_USER,
                password: index_1.DB_PASSWORD,
                host: index_1.DB_HOST,
                port: +index_1.DB_PORT,
                database: index_1.DB_DATABASE,
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
        DB.write = (0, knex_1.default)(configOptions);
        await DB.write.raw("SELECT 'write db connected' AS status");
        winston_logger_1.logger.info('Write Database connected');
        configOptions.connection.host = index_1.DB_READ_HOST;
        DB.read = (0, knex_1.default)(configOptions);
        await DB.read.raw("SELECT 'readt db connected' AS status");
        winston_logger_1.logger.info('Read Database connected');
        if ((index_1.DB_MIGRATE_ON_START === null || index_1.DB_MIGRATE_ON_START === void 0 ? void 0 : index_1.DB_MIGRATE_ON_START.toLocaleLowerCase()) === 'true') {
            await migrate();
        }
        return true;
    }
    catch (error) {
        winston_logger_1.logger.error('Database Connection Error!!', error);
    }
    return false;
}
exports.connectdb = connectdb;
async function getTransaction() {
    const trx = await DB.write.transaction();
    return trx;
}
exports.getTransaction = getTransaction;
//# sourceMappingURL=knex.js.map