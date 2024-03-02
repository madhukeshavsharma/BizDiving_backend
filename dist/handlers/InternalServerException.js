"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_logger_1 = require("../utilities/logger/winston_logger");
exports.default = (res, err) => {
    const error = err;
    winston_logger_1.logger.error(error);
    const sendData = {
        status: false,
        statusCode: 500,
        errorCode: 9999,
        message: 'Internal Server error',
        result: {},
    };
    if (error.statusCode && error.statusCode < 600) {
        sendData.message = error.message;
        sendData.result = error.result;
        sendData.statusCode = error.statusCode;
        sendData.errorCode = error.errorCode;
    }
    return res.status(sendData.statusCode).send(sendData);
};
//# sourceMappingURL=InternalServerException.js.map