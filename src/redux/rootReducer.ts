import { combineReducers } from 'redux';

import { treeReducer } from './reducers/treeReducer';

export const rootReducer = combineReducers({ state: treeReducer });
