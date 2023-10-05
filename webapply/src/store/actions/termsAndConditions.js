export const TERMS_ACCEPTED = "TERMS_ACCEPTED";
export const SEND_KFS_MAIL = "SEND_KFS_MAIL";

export const termsAndConditionsAccepted = payload => {
  return { type: TERMS_ACCEPTED, payload };
};

export const sendKfsMail = docModificationInfo => {
  return { type: SEND_KFS_MAIL, payload: { docModificationInfo } };
};
