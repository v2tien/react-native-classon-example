import { SectionType } from '@classon/react-native';

export type PlayProps = {
  classId?: string | number;
  token?: string | null;
  bookData: SectionType[];
  hasSocket?: boolean;
  isTeacher?: boolean;
  userId?: string;
};
