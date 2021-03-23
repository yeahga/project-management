import {
    APPEND_DEVELOPER, APPEND_MANAGER, APPEND_PROJECT, DELETE_MANAGER, INIT,
    SET_CURRENTLY_EDITING_ID, SET_ERROR, UPDATE_DEVELOPER, UPDATE_MANAGER, UPDATE_PROJECT
} from './actionTypes';

export function init(payload: any) {
  return {
    type: INIT,
    payload,
  };
}

export function setError(payload: any) {
  return {
    type: SET_ERROR,
    payload,
  };
}

export function appendManager(payload: any) {
  return {
    type: APPEND_MANAGER,
    payload,
  };
}

export function setCurrentlyEditingID(payload: any) {
  return {
    type: SET_CURRENTLY_EDITING_ID,
    payload,
  };
}

export function updateManager(payload: any) {
  return {
    type: UPDATE_MANAGER,
    payload,
  };
}

export function deleteManager(payload: any) {
  return {
    type: DELETE_MANAGER,
    payload,
  };
}

export function appendProject(payload: any) {
  return {
    type: APPEND_PROJECT,
    payload,
  };
}

export function updateProject(payload: any) {
  return {
    type: UPDATE_PROJECT,
    payload,
  };
}

export function appendDeveloper(payload: any) {
  return {
    type: APPEND_DEVELOPER,
    payload,
  };
}

export function updateDeveloper(payload: any) {
  return {
    type: UPDATE_DEVELOPER,
    payload,
  };
}
