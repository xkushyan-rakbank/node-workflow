import { createBrowserHistory } from "history";
import { persistStore } from "redux-persist";

import { configureStore } from "./configureStore";

if (process.env.NODE_ENV !== "test") {
  /* eslint-disable */
  history = createBrowserHistory({basename: process.env.REACT_APP_CONTEXT_PATH ||_'/'});
  store = configureStore(initialState, history).store;
  persistor = persistStore(store);
  /* eslint-enable */
}

export const initialState = {};
export let store;
export let history;
export let persistor;
