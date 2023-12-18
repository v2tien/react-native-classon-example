import { SectionType } from '@classon/react-native';

export type PlayProps = {
  classId?: string | number;
  token?: string | null;
  bookData: SectionType[];
  live?: boolean;
  user: { id: string | number; role: string; fullname?: string };
};
