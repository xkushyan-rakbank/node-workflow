import {
  ABOUT_COMPANY_FORM_SUCCESS,
  ABOUT_COMPANY_FORM_FAIL
} from "../actions/aboutCompany";

const initialState = {
  loading: false
};

const aboutCompanyReducer = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default aboutCompanyReducer;
