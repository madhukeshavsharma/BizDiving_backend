"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORIGIN = exports.SECRET_KEY = exports.LOG_DIR = exports.LOG_FORMAT = exports.DB_DATABASE = exports.DB_PORT = exports.DB_READ_HOST = exports.DB_HOST = exports.DB_PASSWORD = exports.DB_USER = exports.DB_MIGRATE_ON_START = exports.SERVER_PORT = exports.NODE_ENV = exports.CREDENTIALS = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.CREDENTIALS = process.env.CREDENTIALS === 'true';
_a = process.env, exports.NODE_ENV = _a.NODE_ENV, exports.SERVER_PORT = _a.SERVER_PORT, exports.DB_MIGRATE_ON_START = _a.DB_MIGRATE_ON_START, exports.DB_USER = _a.DB_USER, exports.DB_PASSWORD = _a.DB_PASSWORD, exports.DB_HOST = _a.DB_HOST, exports.DB_READ_HOST = _a.DB_READ_HOST, exports.DB_PORT = _a.DB_PORT, exports.DB_DATABASE = _a.DB_DATABASE, exports.LOG_FORMAT = _a.LOG_FORMAT, exports.LOG_DIR = _a.LOG_DIR, exports.SECRET_KEY = _a.SECRET_KEY, exports.ORIGIN = _a.ORIGIN;
//# sourceMappingURL=index.js.map