import { delay } from 'redux-saga';
import { call, put, takeEvery, all, fork, select } from 'redux-saga/effects';
import _isEmpty from 'lodash/isEmpty';
import _find from 'lodash/find';

import * as types from '../configs/ActionTypes';
import * as entityActions from '../actions/entityActions';

import { entitySelector } from '../selectors/entitySelectors';
import { api } from './services';


export function* fetchEntities(action) {
  const { entityType } = action;
  const entities = yield call(api.fetchEntities, entityType);
  yield put(entityActions.entitiesFetchSucceeded(entityType, entities));
}

export function* updateEntityField(action) {
  const { schema, id, fieldName, newValue } = action;
  const { entityType } = schema;
  let entity = yield select(entitySelector, entityType, id);
  entity = entity.set(fieldName, newValue);
  if (id != 'new') {
    entity = yield call(api.updateEntity, entityType, entity);
  } 
  yield put(entityActions.entityFetchSuccessed(entityType, entity, false));
  if (id == 'new') {
    const requiredField = _find(schema.required, (fieldName) => ( _isEmpty(entity[fieldName]) ));
    if (requiredField) {
      yield delay(1);
      yield put(entityActions.startEntityEditing(entityType, id, requiredField));
    } else {
      entity = yield call(api.syncNewEntity, entityType, entity.without('id'));
      yield put(entityActions.removeEntitySuccessed(entityType, id));
      yield put(entityActions.entityFetchSuccessed(entityType, entity, true));
    }
  }
}

export function* removeEntity(action) {
  const { entityType, id } = action;
  if (id != 'new') {
    yield call(api.removeEntity, entityType, id);
  } 
  yield put(entityActions.removeEntitySuccessed(entityType, id));
}


export function* watchFetchEntities() {
  yield takeEvery(types.FETCH_ENTITIES, fetchEntities);
}

export function* watchUpdateEntityField() {
  yield takeEvery(types.UPDATE_ENTITY_FIELD, updateEntityField);
}

export function* watchRemoveEntity() {
  yield takeEvery(types.REMOVE_ENTITY, removeEntity);
}


export default function* rootSaga() {
  yield all([
    fork(watchFetchEntities),
    fork(watchUpdateEntityField),
    fork(watchRemoveEntity),
  ]);
}