export const RETRIEVE_DOC_UPLOADER = "RETRIEVE_DOC_UPLOADER";
export const RETRIEVE_DOC_DETAILS_SUCCESS = "RETRIEVE_DOC_DETAILS_SUCCESS";
export const RETRIEVE_DETAILS_ERROR = "RETRIEVE_DETAILS_ERROR";

export const DOC_UPLOADER_COUNT = "DOC_UPLOADER_COUNT";

export const retrieveDocDetails = () => {
  return { type: RETRIEVE_DOC_UPLOADER };
};

export const retrieveDocDetailssSuccess = payload => {
  return { type: RETRIEVE_DOC_DETAILS_SUCCESS, payload };
};

export const retrieveDocDetailssError = payload => {
  return { type: RETRIEVE_DETAILS_ERROR, payload };
};
