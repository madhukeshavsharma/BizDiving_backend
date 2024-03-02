import {NextFunction, Request, Response} from 'express';
import {verify} from 'jsonwebtoken';
import {SECRET_KEY} from '../config/index';
import {HttpException} from '../handlers/HttpException';
import {logger} from '@/utilities/logger/winston_logger';
import {UserType} from '@/enum';
import {readAdminById} from '@/modules/user/model';

export interface IJwtUser {
  id: number;
  user_type: UserType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  exp?: number;
  iat: number;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    export interface Request {
      user: IJwtUser;
      baseUrl: string;
    }
  }
}

async function authenticate_jwt(
  req: Request,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _res: Response
): Promise<IJwtUser | undefined> {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  let result: IJwtUser | undefined;
  if (!token) {
    throw new HttpException(401, 0, 'Authorization Error', {});
  } else {
    try {
      const user = await verify(token, SECRET_KEY);
      if (!user) {
        throw new HttpException(403, 0, 'Forbidden', {});
      } else {
        return user;
      }
    } catch (error) {
      throw new HttpException(401, 0, 'Authorization Error', {});
    }
  }
  return result;
}

async function authenticate_user_type(
  req: Request,
  res: Response,
  user_type: UserType
): Promise<Request | undefined> {
  const user = await authenticate_jwt(req, res);
  if (user) {
    if (user.user_type !== user_type) {
      throw new HttpException(403, 0, 'Forbidden', {});
    } else {
      req.user = user;
      return req;
    }
  }
  return undefined;
}

export async function authenticate_admin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const rq = await authenticate_user_type(req, res, UserType.ADMIN);
  if (rq) {
    req = rq;
    const expire_admin_token_epoch = 300;
    if (req.user.iat > expire_admin_token_epoch) {
      const admin = await readAdminById(req.user.id);
      if (!admin) {
        throw new HttpException(401, 0, 'Authorization Error', {});
      }

      logger.info('ADMIN_REQUEST', {
        admin: req.user,
        api_url: req.originalUrl,
        method: req.method,
        request_query: req.query,
        request_param: req.params,
        request_body: req.body,
      });
      return next();
    } else {
      throw new HttpException(401, 0, 'Authorization Error', {});
    }
  }
}
