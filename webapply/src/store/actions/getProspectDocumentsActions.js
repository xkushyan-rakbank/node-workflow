export const RETRIEVE_DOC_UPLOADER = "RETRIEVE_DOC_UPLOADER";
export const RETRIEVE_DOC_DETAILS_SUCESS = "RETRIEVE_DOC_DETAILS_SUCESS";
export const RETRIEVE_DETAILS_ERROR = "RETRIEVE_DETAILS_ERROR";

export const DOC_UPLOADER_COUNT = "DOC_UPLOADER_COUNT";

export const retrieveDocDetails = () => {
  return { type: RETRIEVE_DOC_UPLOADER };
};

export const retrieveDocDetailssSuccess = payload => {
  return { type: RETRIEVE_DOC_DETAILS_SUCESS, payload };
};

export const retrieveDocDetailssError = payload => {
  return { type: RETRIEVE_DETAILS_ERROR, payload };
};
