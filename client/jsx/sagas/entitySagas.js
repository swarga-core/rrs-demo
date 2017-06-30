import { delay } from 'redux-saga';
import { call, put, takeEvery, all, fork, select } from 'redux-saga/effects';
import _ from 'lodash';

import * as types from '../configs/ActionTypes';
import * as entityActions from '../actions/entityActions';

import { entitySelector } from '../selectors/entitySelectors';
import { api } from './services'


export function* fetchEntities(action) {
	const { entityType } = action;
  const entities = yield call(api.fetchEntities, entityType);
  yield put(entityActions.entitiesFetchSucceeded(entityType, entities));
}

export function* watchFetchEntities() {
  yield takeEvery(types.FETCH_ENTITIES, fetchEntities);
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
    const requiredField = _.find(schema.required, (fieldName) => ( _.isEmpty(entity[fieldName]) ));
    console.log(requiredField);
    console.log(entity);
    if (requiredField) {
      yield delay(1);
      yield put(entityActions.startEntityEditing(schema.entityType, id, requiredField));
    } else {
      entity = yield call(api.syncNewEntity, entityType, entity.without('id'));
      yield put(entityActions.removeNewEntity(entityType));
      yield put(entityActions.entityFetchSuccessed(entityType, entity, true));
    }
  }
}

export function* watchUpdateEntityField() {
  yield takeEvery(types.UPDATE_ENTITY_FIELD, updateEntityField);
}


export function* removeEntity(action) {
	const { entityType, id } = action;
  if (id == 'new') {
    yield put(entityActions.removeNewEntity(entityType));
  } else {
    yield call(api.removeEntity, entityType, id);
  }
	yield put({type: types.ENTITY_REMOVE_SUCCEEDED, entityType, id });
}

export function* watchRemoveEntity() {
  yield takeEvery(types.REMOVE_ENTITY, removeEntity);
}

export default function* rootSaga() {
  yield all([
    fork(watchFetchEntities),
    fork(watchUpdateEntityField),
    fork(watchRemoveEntity),
  ])
}