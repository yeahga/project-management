import useState from '@hooks/useState';

export default function useManagers() {
  const { managers } = useState();

  return managers;
}
