export interface IAdmin {
  id?: string;
  user_name: string;
  password?: string;
  force_change_password?: boolean;
  full_name: string;
  phone: string;
  email: string;
  is_deleted?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
