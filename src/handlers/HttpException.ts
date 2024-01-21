export class HttpException extends Error {
  status = false;
  statusCode = 500;
  errorCode = 0;
  message = '';
  result = {};
  constructor(
    statusCode: number,
    errorCode: number,
    message: string,
    result: object
  ) {
    super(message);
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
