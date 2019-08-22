import { combineReducers } from "redux";
import uploadFile from "./uploadFile";
import { connectRouter } from "connected-react-router";

const reducers = history =>
  combineReducers({
    router: connectRouter(history),
    uploadFile
  });

export default reducers;
