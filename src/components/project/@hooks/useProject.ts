import useProjects from './useProjects';

export default function useProject(projectId: string) {
  const projects = useProjects();

  return projects.find((p) => p._id === projectId);
}
