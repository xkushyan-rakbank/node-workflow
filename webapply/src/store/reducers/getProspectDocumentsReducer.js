import {
  RETRIEVE_DOC_DETAILS_SUCESS,
  RETRIEVE_DETAILS_ERROR
} from "../actions/getProspectDocumentsActions";

const initialState = {
  docs: []
};

const docUploader = (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_DOC_DETAILS_SUCESS:
      return {
        ...state,
        docs: action.payload
      };
    case RETRIEVE_DETAILS_ERROR:
      return {
        ...state,
        docs: action.payload
      };
    default:
      return state;
  }
};

export default docUploader;
