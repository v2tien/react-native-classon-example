import { Partner } from './partner';

export interface Profile {
  user: User;
  partner?: Partner;
  token: { jwt: string; exp: number };
}

export interface User {
  id: string;
  creator_user_id: string;
  partner_id: string;
  first_name: null | string;
  last_name: null | string;
  username: string;
  email: null | string;
  phone: null | string;
  avatar: null | string;
  status: number;
  created_at: string;
  updated_at: string;
  updated_password_at: string;
}
