"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
class HttpException extends Error {
    constructor(statusCode, errorCode, message, result) {
        super(message);
        this.status = false;
        this.statusCode = 500;
        this.errorCode = 0;
        this.message = '';
        this.result = {};
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.message = message;
        this.result = result;
        const actualProto = new.target.prototype;
        if (Object.setPrototypeOf) {
            Object.setPrototypeOf(this, actualProto);
        }
    }
}
exports.HttpException = HttpException;
//# sourceMappingURL=HttpException.js.map