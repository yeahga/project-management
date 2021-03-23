import { useParams } from 'react-router-dom';

export default function useProjectId() {
  const { projectId } = useParams<{ projectId: string }>();

  return projectId;
}
