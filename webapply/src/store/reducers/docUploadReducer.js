import { DOC_UPLOAD_DETAILS_SUCCESS, DETAILS_UPLOAD_ERROR } from "../actions/getProspectDocuments";

const initialState = {
  uploadDocsDetails: []
};

const uploaderDocs = (state = initialState, action) => {
  switch (action.type) {
    case DOC_UPLOAD_DETAILS_SUCCESS:
      return {
        ...state,
        docs: action.payload
      };
    case DETAILS_UPLOAD_ERROR:
      return {
        ...state,
        docs: action.payload
      };
    default:
      return state;
  }
};

export default uploaderDocs;
