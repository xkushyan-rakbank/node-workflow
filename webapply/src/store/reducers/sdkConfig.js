import { CREATE_SDK_CONFIG_SUCCESS } from "../actions/sdkConfig";
import { handleActions } from "../../utils/redux-utils";

export const initialState = {
  loading: false,
  sdkConfig: "",
  error: ""
};

export default handleActions(
  {
    [CREATE_SDK_CONFIG_SUCCESS]: (state, { payload }) => ({
      ...state,
      loading: false,
      sdkConfig: payload
    })
  },
  initialState
);
