import useState from './useState';

export default function useCurrentlyEditingID() {
  const { currentlyEditingID } = useState();

  return currentlyEditingID;
}
