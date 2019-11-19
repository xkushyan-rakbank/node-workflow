export const APPLICANT_INFO_FORM = "APPLICANT_INFO_FORM";
export const APPLICANT_INFO_FORM_SUCCESS = "APPLICANT_INFO_FORM_SUCCESS";
export const APPLICANT_INFO_FORM_FAIL = "APPLICANT_INFO_FORM_FAIL";

export const applicantInfoForm = data => {
  return { type: APPLICANT_INFO_FORM, data };
};

export const applicantInfoFormSuccess = () => {
  return { type: APPLICANT_INFO_FORM_SUCCESS };
};

export const applicantInfoFormFail = error => {
  return { type: APPLICANT_INFO_FORM_FAIL, error };
};
