export declare class HttpException extends Error {
    status: boolean;
    statusCode: number;
    errorCode: number;
    message: string;
    result: {};
    constructor(statusCode: number, errorCode: number, message: string, result: object);
}
