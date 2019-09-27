import { DOC_UPLOADER_SUCESS, DOC_UPLOADER_ERROR } from "../actions/uploadDocActions";

const initialState = {
  docs: []
};

const docUploader = (state = initialState, action) => {
  switch (action.type) {
    case DOC_UPLOADER_SUCESS:
      return {
        ...state,
        docs: action.payload
      };
    case DOC_UPLOADER_ERROR:
      return {
        ...state,
        docs: action.payload
      };
    default:
      return state;
  }
};

export default docUploader;
