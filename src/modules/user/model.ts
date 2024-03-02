import {DB} from '@/data/knex';
import {logger} from '@/utilities/logger/winston_logger';
import {IAdmin} from './type';

export async function createAdmin(admin: IAdmin): Promise<IAdmin> {
  logger.debug('creating admin', admin);

  const result: IAdmin = (
    await DB.write('admin_master').returning('*').insert(admin)
  )[0];
  return result;
}

export async function readAdminById(admin_id: number): Promise<IAdmin> {
  logger.debug('reading admin by id', admin_id);

  const result: IAdmin = (
    await DB.read('admin_master')
      .select('*')
      .where({id: admin_id})
      .returning('*')
  )[0];
  return result;
}

export async function readAdminByLoginId(
  admin_login_id: string
): Promise<IAdmin> {
  logger.debug('reading admin by login id', admin_login_id);

  const result: IAdmin = (
    await DB.read('admin_master').select('*').where({login_id: admin_login_id})
  )[0];
  return result;
}
