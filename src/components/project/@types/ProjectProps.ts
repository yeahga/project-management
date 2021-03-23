import type { DeveloperProps } from '@components/developer/@types';

export type ProjectProps = {
  _id: string;
  name: string;
  description: string;
  developers: DeveloperProps[];
};
