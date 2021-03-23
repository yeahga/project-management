import { useParams } from 'react-router-dom';

export default function useDeveloperId() {
  const { developerId } = useParams<{ developerId: string }>();

  return developerId;
}
