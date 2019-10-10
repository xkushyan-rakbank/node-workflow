import {
  RETRIEVE_DOC_DETAILS_SUCCESS,
  RETRIEVE_DETAILS_ERROR
} from "../actions/getProspectDocuments";

const initialState = {
  docs: []
};

const retrieveUploader = (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_DOC_DETAILS_SUCCESS:
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

export default retrieveUploader;
