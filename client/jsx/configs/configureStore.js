import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import entities from '../reducers/entities';
import app from '../reducers/app';
import rootSaga from '../sagas/sagas'


export default function configureStore() {
	const sagaMiddleware = createSagaMiddleware();
	const rootReducer = combineReducers({
	  entities,
	  app,
	});

  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);
  return store;
}