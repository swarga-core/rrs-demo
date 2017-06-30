import * as types from '../configs/ActionTypes';


export function startEntityEditing(entityType, id, field) {
  return {
    type: types.START_ENTITY_EDITING,
    entityType,
    id,
    field,
  };
}

export function stopEntityEditing() {
  return {
    type: types.STOP_ENTITY_EDITING,
  };
}

export function fetchEntities(entityType) {
  return {
    type: types.FETCH_ENTITIES,
    entityType,
  };
}

export function entitiesFetchSucceeded(entityType, entities) {
  return {
    type: types.ENTITIES_FETCH_SUCCEEDED,
    entityType,
    entities,
  };
}

export function entityFetchSuccessed(entityType, entity, itWasNew) {
  return {
    type: types.ENTITY_FETCH_SUCCEEDED,
    entityType,
    entity,
    itWasNew,
  };
}

export function updateEntityField(schema, id, fieldName, newValue) {
  return {
    type: types.UPDATE_ENTITY_FIELD,
    schema,
    id,
    fieldName,
    newValue,
  };
}

export function addNewEntity(entityType) {
  return {
    type: types.ADD_NEW_ENTITY,
    entityType,
  };
}

export function removeEntity(entityType, id) {
  return {
    type: types.REMOVE_ENTITY,
    entityType,
    id,
  };
}

export function removeNewEntity(entityType) {
  return {
    type: types.REMOVE_NEW_ENTITY,
    entityType,
  };
}