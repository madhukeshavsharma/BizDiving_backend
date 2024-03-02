"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const swagger_ui_express_1 = tslib_1.__importDefault(require("swagger-ui-express"));
const swagger_docs_1 = tslib_1.__importDefault(require("./utilities/swagger_docs"));
const compression_1 = tslib_1.__importDefault(require("compression"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const hpp_1 = tslib_1.__importDefault(require("hpp"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const winston_logger_1 = require("./utilities/logger/winston_logger");
const route_1 = tslib_1.__importDefault(require("./modules/route"));
const HttpResponse_1 = require("./handlers/HttpResponse");
const knex_1 = require("./data/knex");
async function createServer() {
    const server = (0, express_1.default)();
    await (0, knex_1.connectdb)();
    server.use((0, morgan_1.default)('dev', { stream: winston_logger_1.stream }));
    server.use((0, cors_1.default)());
    server.use((0, hpp_1.default)());
    server.use((0, helmet_1.default)());
    server.use((0, compression_1.default)());
    server.use(express_1.default.json());
    server.use(express_1.default.urlencoded({ extended: true }));
    /**
     * @openapi
     * /health:
     *  get:
     *     tags:
     *     - Health Check
     *     description: Responds if the app is up and running
     *     responses:
     *       200:
     *         description: App is up and running
     */
    server.use('/health', async (req, res) => {
        const dbOk = await (0, knex_1.pingdb)();
        if (dbOk) {
            return (0, HttpResponse_1.HttpResponse)(res, 200, 'success', {});
        }
        else {
            res.status(500).send('DB Error!!');
        }
    });
    server.use('/core/swagger', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_docs_1.default, { explorer: true }));
    server.get('/core/swagger.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swagger_docs_1.default);
    });
    server.use('/', route_1.default);
    return server;
}
exports.createServer = createServer;
//# sourceMappingURL=server.js.map