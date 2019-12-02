import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import createReduxWaitForMiddleware from "redux-wait-for-action";
import { routerMiddleware } from "connected-react-router";

import reducers from "./reducers";
import rootSaga from "./sagas";

export const configureStore = (initialState, history) => {
  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancers =
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 45 })) ||
    compose;

  const store = createStore(
    reducers(history),
    initialState,
    composeEnhancers(
      applyMiddleware(sagaMiddleware, routerMiddleware(history), createReduxWaitForMiddleware())
    )
  );

  sagaMiddleware.run(rootSaga);

  return { store };
};
