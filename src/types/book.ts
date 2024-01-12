export interface Book {
  id: string;
  partner_id: string;
  user_id: string;
  title: string;
  desc: string;
  cover: string | null;
  thumbnail: string | null;
  detail: string | null;
  publish: boolean;
  status: boolean;
}
