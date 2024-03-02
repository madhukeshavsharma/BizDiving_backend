export interface IAdmin {
  id?: string;
  user_name: string;
  password?: string;
  force_change_password?: boolean;
  full_name: string;
  phone: string;
  email: string;
  created_at?: Date;
  updated_at?: Date;
  is_deleted?: boolean;
  is_blocked?: boolean;
  blocked_reason?: string | null;
  blocked_by_admin_id?: string | null;
  unblocked_reason?: string | null;
  unblocked_by_admin_id?: string | null;
}
