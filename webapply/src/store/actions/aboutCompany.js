export const ABOUT_COMPANY_FORM = "ABOUT_COMPANY_FORM";
export const ABOUT_COMPANY_FORM_FAIL = "ABOUT_COMPANY_FORM_FAIL";
export const ABOUT_COMPANY_FORM_SUCCESS = "ABOUT_COMPANY_FORM_SUCCESS";
export const ABOUT_COMPANY_FORM_RESET_STEP = "ABOUT_COMPANY_FORM_RESET_STEP";
export const ABOUT_COMPANY_FORM_STEP_UPDATE = "ABOUT_COMPANY_FORM_STEP_UPDATE";

export const aboutCompany = () => {
  return { type: ABOUT_COMPANY_FORM };
};

export const aboutCompanySuccess = () => {
  return { type: ABOUT_COMPANY_FORM_SUCCESS };
};

export const aboutCompanyFail = error => {
  return { type: ABOUT_COMPANY_FORM_FAIL, error };
};

export const aboutCompanyResetStep = ({ resetStep }) => {
  return { type: ABOUT_COMPANY_FORM_RESET_STEP, resetStep };
};
