import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducers from './reducer';
import sagas from './saga';

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers(rootReducers);
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
const configureStore = () => {
  return store;
};

sagaMiddleware.run(sagas);

export default configureStore;
