import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import createStore from './createStore';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';
import persistReducers from './persistReducers';

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;

const sagaMiddeware = createSagaMiddleware({ sagaMonitor });

const middlewares = [sagaMiddeware];

const store = createStore(persistReducers(rootReducer), middlewares);

const persistor = persistStore(store);

sagaMiddeware.run(rootSaga);

export { store, persistor };
