"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_logger_1 = require("../utilities/logger/winston_logger");
const errorMiddleware = (error, req, res, next) => {
    try {
        const response = {
            status: false,
            statusCode: error.statusCode || 500,
            errorCode: error.errorCode || 0,
            message: error.message || 'Something went wrong',
            result: error.result || {},
        };
        winston_logger_1.logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${response.statusCode}, Message:: ${response.message}`);
        res.status(response.statusCode).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.default = errorMiddleware;
//# sourceMappingURL=error.middleware.js.map