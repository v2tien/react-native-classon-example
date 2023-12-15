import { SectionType } from '@classon/react-native';

export interface Class {
  id: string;
  creator_id: string;
  partner_id: string;
  level_id: string;
  book_id: string;
  lesson_id: string;
  start_at: string;
  end_at: string;
  membership_id: string;
  status: number;
  status2: number;
  notes: string;
  partner_memberships: Membership;
  book_levels: Level;
  book_lessons: Lesson;
  participations: Participation[];
}

export interface Membership {
  id: string;
  creator_id: string;
  partner_id: string;
  branch_id: null | string;
  book_id: null | string;
  code: string;
  title: string;
  desc: string;
  teacher_rank_id: string;
  status: boolean;
}

export interface Level {
  id: string;
  book_id: string;
  parent_id: null | string;
  title: string;
  desc: null;
  order: number;
}

export interface Lesson {
  id: string;
  book_id: string;
  chapter_id: string;
  level_id: string;
  title: string;
  order: null | number;
  duration: number;
  outline: string;
  thumbnail: null | string;
  intro: null | string;
  content: SectionType[];
}

export interface Participation {
  id: string;
  linked_user_id: string;
  class_roles: {
    id: string;
    code: string;
    partner_id: string;
    branch_id: string;
    title: string;
    desc: string;
  };
  linked_user: {
    id: string;
    partner_id: string;
    first_name: null | string;
    last_name: null | string;
    username: string;
    email: null | string;
    phone: null | string;
    avatar: null | string;
  };
}
