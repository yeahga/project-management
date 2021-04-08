import React from 'react';

import { ProjectProps } from '../@types';
import AddProjectForm from '../AddProjectForm';

export type EditProjectProps = { project: ProjectProps };

export default function EditProject({
  project: initialProject,
}: EditProjectProps) {
  return <AddProjectForm formType="__EDIT_FORM__" {...initialProject} />;
}
