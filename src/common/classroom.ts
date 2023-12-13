import { SectionType } from '@classon/react-native';

export type PlayProps = {
  classId?: string | number;
  token?: string;
  bookData: SectionType[];
  hasSocket?: boolean;
  isTeacher?: boolean;
};
