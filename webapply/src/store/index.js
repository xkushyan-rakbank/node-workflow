import { createBrowserHistory } from "history";
import { persistStore } from "redux-persist";

import { configureStore } from "./configureStore";

export const initialState = {};
export const history = createBrowserHistory();
export const { store } = configureStore(initialState, history);
export const persistor = persistStore(store);
