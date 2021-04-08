import type { DeveloperProps } from '@components/developer/@types';

type Field = {
  name: string;
  value: string;
  isRequired: boolean;
};

type Fields = Field[];

export type ProjectProps = {
  _id: string;
  managerId: string;
  name: string;
  description: string;
  developers: DeveloperProps[];
  fields: Fields;
};
