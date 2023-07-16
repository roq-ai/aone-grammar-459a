import { LessonInterface } from 'interfaces/lesson';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface AssignmentInterface {
  id?: string;
  lesson_id?: string;
  student_id?: string;
  status: string;
  created_at?: any;
  updated_at?: any;

  lesson?: LessonInterface;
  user?: UserInterface;
  _count?: {};
}

export interface AssignmentGetQueryInterface extends GetQueryInterface {
  id?: string;
  lesson_id?: string;
  student_id?: string;
  status?: string;
}
