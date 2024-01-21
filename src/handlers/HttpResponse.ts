import {Response} from 'express';

export function HttpResponse(
  res: Response,
  statusCode: number,
  message: string,
  result: object
) {
  const sendData = {
    status: true,
    statusCode: statusCode,
    message: message,
    result: result || {},
  };
  return res.status(sendData.statusCode).send(sendData);
}
