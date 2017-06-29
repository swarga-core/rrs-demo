import { call, put, takeEvery, all, fork, select } from 'redux-saga/effects'
import _ from 'lodash';
import * as types from '../configs/ActionTypes';
import { api } from './services'


export function* fetchEntities(action) {
	const { entityType } = action;
  const entities = yield call(api.fetchEntities, entityType);
  yield put({type: types.ENTITIES_FETCH_SUCCEEDED, entityType, entities });
}

export function* watchFetchEntities() {
  yield takeEvery(types.FETCH_ENTITIES, fetchEntities);
}


export function* updateEntity(action) {
	const { entityType } = action;
  const entity = yield call(api.updateEntity, entityType, action.entity);
  yield put({type: types.ENTITY_FETCH_SUCCEEDED, entityType, entity, itWasNew: false });
}

export function* watchUpdateEntity() {
  yield takeEvery(types.UPDATE_ENTITY, updateEntity);
}


export function* removeEntity(action) {
	const { entityType, id } = action;
  const success = yield call(api.removeEntity, entityType, id);
  if (success) {
	  yield put({type: types.ENTITY_REMOVE_SUCCEEDED, entityType, id });
	}
}

export function* watchRemoveEntity() {
  yield takeEvery(types.REMOVE_ENTITY, removeEntity);
}


export function* syncNewEntity(action) {
	const { entityType } = action;
	const state = yield select();
	const newEntity = state.entities[entityType]['new'];
  const entity = yield call(api.syncNewEntity, entityType, newEntity.without('id'));
  yield put({type: types.ENTITY_FETCH_SUCCEEDED, entityType, entity, itWasNew: true });
}

export function* watchSyncNewEntity() {
  yield takeEvery(types.SYNC_NEW_ENTITY, syncNewEntity);
}


export default function* rootSaga() {
  yield all([
    fork(watchFetchEntities),
    fork(watchUpdateEntity),
    fork(watchRemoveEntity),
    fork(watchSyncNewEntity),
  ])
}