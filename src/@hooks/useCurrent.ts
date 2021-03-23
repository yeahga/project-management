import { useSelector } from 'react-redux';
import type { State } from '@redux/reducers/treeReducer';

export default function useCurrent() {
  const { current, currentlyEditingID } = useSelector(
    ({ state }: { state: State }) => {
      return {
        current: state.current,
        currentlyEditingID: state.currentlyEditingID,
      };
    }
  );

  return { current, currentlyEditingID };
}
