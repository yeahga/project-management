import {
  APPEND_DEVELOPER,
  APPEND_MANAGER,
  APPEND_PROJECT,
  GO_HOME,
  INIT,
  SET_CURRENT,
  SET_CURRENTLY_EDITING_ID,
  SET_ERROR,
  UPDATE_DEVELOPER,
  UPDATE_MANAGER,
  UPDATE_PROJECT,
} from '../actionTypes';

import type { Type } from '../actionTypes';

type Payload = any;
type Action = { type: Type; payload: Payload };

type Manager = {
  _id: string;
  name: string;
  type: 'manager';
  projects: any[];
};

export type State = {
  managers: Manager[];
  error: any;
  isFetching: boolean;
  current: any;
  currentlyEditingID: null | string;
};

export const initialState: State = {
  managers: [],
  error: false,
  isFetching: true,
  current: null,
  currentlyEditingID: null,
};

export const treeReducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        error: false,
        isFetching: false,
        managers: action.payload,
      };

    case SET_ERROR:
      return { ...state, error: action.payload, isFetching: false };

    case APPEND_MANAGER:
      return { ...state, managers: [...state.managers, action.payload] };

    case SET_CURRENT:
      return { ...state, current: action.payload };

    case SET_CURRENTLY_EDITING_ID:
      return { ...state, currentlyEditingID: action.payload };

    case UPDATE_MANAGER:
      return {
        ...state,
        managers: state.managers.map((m) =>
          m._id === action.payload._id ? { ...m, ...action.payload } : m
        ),
        current: state.current ? { ...state.current, ...action.payload } : null,
        currentlyEditingID: null,
      };

    case APPEND_PROJECT:
      return {
        ...state,
        managers: state.managers.map((m) => {
          if (m._id === action.payload.managerId) {
            m.projects = [...(m.projects || []), action.payload];
          }
          return m;
        }),
      };

    case UPDATE_PROJECT:
      return {
        ...state,
        managers: state.managers.map((m) => {
          (m.projects || []).map((p) => {
            if (p._id === action.payload._id) {
              return { ...action.payload, developers: p.developers };
            }
            return p;
          });
          return m;
        }),
        current: state.current
          ? { ...action.payload, developers: state.current.developers }
          : null,
        currentlyEditingID: null,
      };

    case APPEND_DEVELOPER:
      return {
        ...state,
        managers: state.managers.map((m) => {
          m.projects.map((p) => {
            if (p._id === action.payload.projectId) {
              p.developers = [...(p.developers || []), action.payload];
            }
            return p;
          });
          return m;
        }),
      };

    case UPDATE_DEVELOPER:
      return {
        ...state,
        managers: state.managers.map((m) => {
          m.projects.map((p) => {
            p.developers = (p.developers || []).filter(
              (d: any) => d._id !== action.payload._id
            );
            if (p._id === action.payload.projectId) {
              p.developers = [...p.developers, action.payload];
            }
            return p;
          });
          return m;
        }),
        current: state.current ? { ...action.payload } : null,
        currentlyEditingID: null,
      };

    case GO_HOME:
      return {
        ...state,
        current: null,
        currentlyEditingID: null,
      };

    default:
      return state;
  }
};
