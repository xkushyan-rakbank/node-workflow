import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import reducers from "./reducers";
import rootSaga from "./sagas";
import { routerMiddleware } from "connected-react-router";
import { basename } from "./../routes";

export const history = createBrowserHistory(basename);

const configureStore = (initialState, browserHistory) => {
  const routermw = routerMiddleware(browserHistory);
  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    reducers(history),
    initialState,
    composeEnhancers(
      applyMiddleware(routermw),
      applyMiddleware(sagaMiddleware, routerMiddleware(history))
    )
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore({}, history);
