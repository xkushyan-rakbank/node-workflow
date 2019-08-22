import {
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAIL
} from "../actions/uploadFile";

const initialState = {
  loading: false,
  error: ""
};

const uploadFile = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_FILE:
      return {
        ...state,
        loading: true,
        error: ""
      };
    case UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case UPLOAD_FILE_FAIL:
      return {
        ...state,
        loading: false,
        error: "error"
      };
    default:
      return state;
  }
};

export default uploadFile;
