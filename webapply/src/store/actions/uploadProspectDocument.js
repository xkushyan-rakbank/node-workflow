export const DOC_UPLOADER = "DOC_UPLOADER";
export const DOC_UPLOAD_DETAILS_SUCCESS = "DOC_UPLOAD_DETAILS_SUCCESS";
export const DETAILS_UPLOAD_ERROR = "DETAILS_UPLOAD_ERROR";

export const docuploadDetails = data => {
  return { type: DOC_UPLOADER, data };
};

export const docUploadDetailsSuccess = payload => {
  return { type: DOC_UPLOAD_DETAILS_SUCCESS, payload };
};

export const docUploadDetailsError = payload => {
  return { type: DETAILS_UPLOAD_ERROR, payload };
};
