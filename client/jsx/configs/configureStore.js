import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import entities from '../reducers/entities';
import app from '../reducers/app';
import rootSaga from '../sagas/entitySagas';


export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const rootReducer = combineReducers({
    entities,
    app,
  });

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
  sagaMiddleware.run(rootSaga);
  return store;
}