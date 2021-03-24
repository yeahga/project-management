import { ProjectProps } from '../@types';

export default function getProjectById(
  projects: ProjectProps[],
  projectId: string
): ProjectProps | undefined {
  return projects.find((p) => p._id === projectId);
}
