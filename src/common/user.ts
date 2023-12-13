export interface User {
  id: string;
  partner_id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone: string;
  avatar: string | null;
  status: number;
}
