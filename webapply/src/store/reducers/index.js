import { combineReducers } from "redux";
import uiConfig from "./uiConfig";
import { connectRouter } from "connected-react-router";

const reducers = history =>
  combineReducers({
    router: connectRouter(history),
    uiConfig
  });

export default reducers;
