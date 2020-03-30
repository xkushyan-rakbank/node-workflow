import { createBrowserHistory } from "history";
import { persistStore } from "redux-persist";

import { configureStore } from "./configureStore";

if (process.env.NODE_ENV !== "test") {
  history = createBrowserHistory();
  store = configureStore(initialState, history).store;
  persistor = persistStore(store);
}

export const initialState = {};
export let store;
export let history;
export let persistor;
