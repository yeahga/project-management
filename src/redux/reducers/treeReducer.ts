import { ManagerProps } from '@components/manager/@types';

import {
  APPEND_DEVELOPER,
  APPEND_MANAGER,
  APPEND_PROJECT,
  INIT,
  SET_CURRENTLY_EDITING_ID,
  SET_ERROR,
  UPDATE_DEVELOPER,
  UPDATE_MANAGER,
  UPDATE_PROJECT,
  MOVE_DEVELOPER,
} from '../actionTypes';

import type { Type } from '../actionTypes';
type Payload = any;
type Action = { type: Type; payload: Payload };

export type State = {
  managers: ManagerProps[];
  error: any;
  isFetching: boolean;
  currentlyEditingID: null | string;
};

export const initialState: State = {
  managers: [],
  error: false,
  isFetching: true,
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

    case SET_CURRENTLY_EDITING_ID:
      return { ...state, currentlyEditingID: action.payload };

    case UPDATE_MANAGER:
      return {
        ...state,
        managers: state.managers.map((m) =>
          m._id === action.payload._id ? { ...m, ...action.payload } : m
        ),
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
        currentlyEditingID: null,
      };

    case MOVE_DEVELOPER:
      return {
        ...state,
        managers: state.managers.map((m) => {
          m.projects.map((p) => {
            if (p._id === action.payload.sourceProjectId) {
              p.developers = p.developers.filter(
                (d) => d._id !== action.payload.developer._id
              );
            } else if (p._id === action.payload.destProjectId) {
              p.developers = [...p.developers, action.payload.developer];
            }
            return p;
          });
          return m;
        }),
      };

    default:
      return state;
  }
};
