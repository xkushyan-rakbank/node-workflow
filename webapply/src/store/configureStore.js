import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import reducers from "./reducers";
import rootSaga from "./sagas";
import { routerMiddleware } from "connected-react-router";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["router", "login", "searchProspect"]
};

export const configureStore = (initialState, history) => {
  const routermw = routerMiddleware(history);
  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancers =
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 45 })) ||
    compose;

  const store = createStore(
    persistReducer(persistConfig, reducers(history)),
    initialState,
    composeEnhancers(
      applyMiddleware(routermw),
      applyMiddleware(sagaMiddleware, routerMiddleware(history))
    )
  );

  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);

  return { store, persistor };
};
