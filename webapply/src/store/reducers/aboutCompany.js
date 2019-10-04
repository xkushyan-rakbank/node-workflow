import {
  ABOUT_COMPANY_FORM,
  ABOUT_COMPANY_FORM_SUCCESS,
  ABOUT_COMPANY_FORM_FAIL,
  ABOUT_COMPANY_FORM_RESET_STEP
} from "../actions/aboutCompany";

const initialState = {
  loading: false,
  resetStep: false
};

const aboutCompanyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ABOUT_COMPANY_FORM:
      return {
        ...state,
        loading: true
      };
    case ABOUT_COMPANY_FORM_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case ABOUT_COMPANY_FORM_FAIL:
      return {
        ...state,
        loading: false
      };
    case ABOUT_COMPANY_FORM_RESET_STEP:
      return {
        ...state,
        resetStep: action.resetStep
      };
    default:
      return state;
  }
};

export default aboutCompanyReducer;
