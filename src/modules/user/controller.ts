import {Request, Response} from 'express';
import {HttpResponse} from 'handlers/HttpResponse';
import {HttpException} from 'handlers/HttpException';
import InternalServerException from 'handlers/InternalServerException';
import {create_admin} from './validation';
import {IAdmin} from './type';
import {encryptPassword} from '@/utilities/crypto';
import * as models from './model';

export async function createAdmin(req: Request, res: Response) {
  try {
    const validation = create_admin.validate(req.body);
    if (validation.error)
      throw new HttpException(
        400,
        1002,
        validation.error.details[0].message,
        {}
      );
    const validated_req = validation.value as IAdmin;
    validated_req.password = await encryptPassword(validated_req.password);
    const admin = await models.createAdmin(validated_req);
    return HttpResponse(res, 200, 'Admin created', {admin});
  } catch (error) {
    return InternalServerException(res, error);
  }
}
