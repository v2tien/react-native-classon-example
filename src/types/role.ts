export interface UserRole {
  id: string;
  creator_id: string;
  user_id: string;
  partner_id: string;
  role_id: string;
  status: boolean;
  roles: {
    id: string;
    partner_id: null | string;
    code: string;
    title: string;
    desc: string;
    status: boolean;
  };
}
