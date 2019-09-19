import {
  APPLICANT_INFO_FORM_SUCCESS,
  APPLICANT_INFO_FORM_FAIL
} from "../actions/applicantInfoForm";

const initialState = {
  loading: false
};

const applicantInfoFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case APPLICANT_INFO_FORM_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case APPLICANT_INFO_FORM_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default applicantInfoFormReducer;
