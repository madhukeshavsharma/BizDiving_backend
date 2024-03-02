import { Response } from 'express';
export declare function HttpResponse(res: Response, statusCode: number, message: string, result: object): Response<any, Record<string, any>>;
