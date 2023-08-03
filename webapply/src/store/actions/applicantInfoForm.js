import { ERROR_ACTION, WAIT_FOR_ACTION } from "redux-wait-for-action";

export const APPLICANT_INFO_FORM = "APPLICANT_INFO_FORM";
export const APPLICANT_INFO_FORM_SUCCESS = "APPLICANT_INFO_FORM_SUCCESS";
export const APPLICANT_INFO_FORM_FAIL = "APPLICANT_INFO_FORM_FAIL";

export const SET_FROM_INVITATION_LINK = "SET_FROM_INVITATION_LINK";

export const applicantInfoFormPromisify = data => {
  return {
    type: APPLICANT_INFO_FORM,
    [WAIT_FOR_ACTION]: APPLICANT_INFO_FORM_SUCCESS,
    [ERROR_ACTION]: APPLICANT_INFO_FORM_FAIL,
    payload: data
  };
};

export const applicantInfoFormSuccess = () => {
  return { type: APPLICANT_INFO_FORM_SUCCESS };
};
export const applicantInfoFormFail = payload => {
  return { type: APPLICANT_INFO_FORM_FAIL, payload };
};

export const setIsFromInvitationLink = () => {
  return { type: SET_FROM_INVITATION_LINK };
};
