import crypto from 'crypto';
import bcrypt from 'bcrypt';

export async function encryptPassword(password: string) {
  const saltRounds = 10;
  const hashed_password = await bcrypt.hash(password, saltRounds);
  return hashed_password;
}
