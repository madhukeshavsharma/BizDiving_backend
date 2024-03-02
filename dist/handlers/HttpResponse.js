"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponse = void 0;
function HttpResponse(res, statusCode, message, result) {
    const sendData = {
        status: true,
        statusCode: statusCode,
        message: message,
        result: result || {},
    };
    return res.status(sendData.statusCode).send(sendData);
}
exports.HttpResponse = HttpResponse;
//# sourceMappingURL=HttpResponse.js.map