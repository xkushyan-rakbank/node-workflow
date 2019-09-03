import { APP_INFO_FORM_SUBMIT } from "../actions/ApplicationInfoSubmit";

const initialState = {
  submit: false,
  error: ""
};

const ApplicationInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case APP_INFO_FORM_SUBMIT:
      return {
        ...state,
        submit: true,
        error: ""
      };
    default:
      return state;
  }
};

export default ApplicationInfoReducer;
