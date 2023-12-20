export type PlayProps = {
  classId?: string | number;
  token?: string | null;
  live?: boolean;
  roleId?: string;
  user: { id: string | number; role: string; fullname?: string };
};
