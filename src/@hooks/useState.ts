import { useSelector } from 'react-redux';

import type { State } from '@redux/reducers/treeReducer';

export default function useState(): State {
  return useSelector(({ state }: { state: State }) => {
    return state;
  });
}
