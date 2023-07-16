import { AssignmentInterface } from 'interfaces/assignment';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface LessonInterface {
  id?: string;
  title: string;
  content: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  assignment?: AssignmentInterface[];
  organization?: OrganizationInterface;
  _count?: {
    assignment?: number;
  };
}

export interface LessonGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  content?: string;
  organization_id?: string;
}
