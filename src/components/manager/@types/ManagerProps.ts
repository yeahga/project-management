import { ProjectProps } from '@components/project/@types';

export type ManagerProps = {
  _id: string;
  name: string;
  projects: ProjectProps[];
};
