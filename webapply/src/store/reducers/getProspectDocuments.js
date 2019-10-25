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
    // case UPLOAD_SUCCESS:
    //   console.log(state.docs.companyDocuments)
    //   return {
    //     ...state,
    //       // ...state.docs.companyDocuments,
    //       // [action.payload.document]: {
    //       //   ...state.docs.companyDocuments[action.payload.document],
    //       //   uploadStatus: state.docs.companyDocuments
    //[action.payload.document].uploadStatus + "Updated"
    //       // }
    //       docs: {
    //         ...state.docs,
    //         companyDocuments: {
    //           ...state.docs.companyDocuments,
    //           [action.payload.document]: {
    //             ...state.docs.companyDocuments[action.payload.document],
    //             uploadStatus: state.docs.companyDocuments
    //[action.payload.document].uploadStatus + "Updated"
    //           }
    //         }
    //       }
    //   }
    default:
      return state;
  }
};

export default retrieveUploader;
