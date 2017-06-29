import * as types from '../configs/ActionTypes';


export function startEntityEditing(entityType, id, field) {
  return {
    type: types.START_ENTITY_EDITING,
    entityType,
    id,
    field,
  };
}

export function onCancelEntityEditing(entityType, id) {
  return {
    type: types.CANCEL_ENTITY_EDITING,
  };
}