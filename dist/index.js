"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const winston_logger_1 = require("./utilities/logger/winston_logger");
const index_1 = require("./config/index");
const index_2 = require("./config/index");
async function app() {
    const server = await (0, server_1.createServer)();
    const port = +index_2.SERVER_PORT || 8080;
    server.listen(port, () => {
        winston_logger_1.logger.info(`=================================`);
        winston_logger_1.logger.info(`======= ENV: ${index_1.NODE_ENV} =======`);
        winston_logger_1.logger.info(`🚀 App listening on the port ${port}`);
        winston_logger_1.logger.info(`=================================`);
        winston_logger_1.logger.info(`======= SWAGGER DOCS ============`);
        winston_logger_1.logger.info(`http://localhost:${port}/core/swagger`);
        winston_logger_1.logger.info(`=================================`);
    });
}
app();
//# sourceMappingURL=index.js.map