import getProjectById from '../@helpers/getProjectById';
import useProjects from './useProjects';

export default function useProject(projectId: string) {
  const projects = useProjects();

  return getProjectById(projects, projectId);
}
