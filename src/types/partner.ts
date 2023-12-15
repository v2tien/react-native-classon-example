import { UserRole } from './role';

export interface Partner {
  id: string;
  code: string;
  user_id: string;
  type_id: string;
  title: string;
  email: string;
  phone: string;
  domain: string;
  website: string;
  country: string;
  city: string;
  address: string;
  extra: {
    logo: string;
    cover: string;
  };
  status: boolean;
  created_at: string;
  updated_at: string;
  partner_types: {
    id: string;
    code: string;
    title: string;
    desc: null | string;
    status: boolean;
  };
  user_roles: UserRole[];
}
