import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import reducer from './reducers';
import loginPasswordSaga from './sagas';

let store;
const sagaMiddleware = createSagaMiddleware();
if (process.env.NODE_ENV === `development`) {
  store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware, logger)
  );
} else {
  store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
  );
}

sagaMiddleware.run(loginPasswordSaga);

export default store;
