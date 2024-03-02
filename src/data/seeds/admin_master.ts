import {Knex} from 'knex';
import {encryptPassword} from '../../utilities/crypto';
import {readAdminByUserName} from '@/modules/user/model';

export async function seed(knex: Knex): Promise<void> {
  const result = await readAdminByUserName('superadminn');
  if (result) return;
  // Deletes ALL existing entries
  // await knex(admintable.TableName).del();

  // Inserts seed entries
  await knex('admin_master').insert([
    {
      user_name: 'superadmin',
      password: await encryptPassword('gOjtaOBEvJV4&445%u6EBYQlP'),
      force_change_password: true,
      full_name: 'Super Admin',
      is_deleted: false,
    },
  ]);
}
