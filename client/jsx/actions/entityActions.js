import * as types from '../configs/ActionTypes';


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

export function updateEntity(entityType, entity) {
  return {
    type: types.UPDATE_ENTITY,
    entityType,
    entity,
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

export function changeEntityValue(entityType, id, fieldName, newValue) {
  return {
    type: types.CHANGE_ENTITY_VALUE,
    entityType,
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

export function syncNewEntity(entityType) {
  return {
    type: types.SYNC_NEW_ENTITY,
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