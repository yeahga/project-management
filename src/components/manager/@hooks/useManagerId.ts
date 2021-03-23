import { useParams } from 'react-router-dom';

export default function useManagerId() {
  const { managerId } = useParams<{ managerId: string }>();

  return managerId;
}
