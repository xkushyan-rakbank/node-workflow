import { createBrowserHistory } from "history";

import { configureStore } from "./configureStore";

export const initialState = {};
export const history = createBrowserHistory();
export const { store, persistor } = configureStore(initialState, history);
