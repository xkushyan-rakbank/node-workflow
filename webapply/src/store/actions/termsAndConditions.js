export const TERMS_ACCEPTED = "TERMS_ACCEPTED";
export const SEND_KFS_MAIL = "SEND_KFS_MAIL";
export const TERMS_LOADING = "TERMS_LOADING";

export const SEND_CUSTOMER_CONSENT_TO_CPF = "SEND_CUSTOMER_CONSENT_TO_CPF";

export const termsAndConditionsAccepted = payload => {
  return { type: TERMS_ACCEPTED, payload };
};

export const sendKfsMail = docModificationInfo => {
  return { type: SEND_KFS_MAIL, payload: { docModificationInfo } };
};

export const sendCustomerConsentToCPF = (docModificationInfo, consentType) => {
  return { type: SEND_CUSTOMER_CONSENT_TO_CPF, payload: { docModificationInfo, consentType } };
};

export const termsAndConditionsLoading = payload => {
  return { type: TERMS_LOADING, payload };
};
