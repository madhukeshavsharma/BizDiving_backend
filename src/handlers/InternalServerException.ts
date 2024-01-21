import {logger} from '../utilities/logger/winston_logger';
import {Response} from 'express';
import {HttpException} from './HttpException';

export default (res: Response, err: unknown) => {
  const error = err as HttpException;
  logger.error(error);

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
