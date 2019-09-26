export const DOC_UPLOADER = "DOC_UPLOADER";
export const DOC_UPLOADER_SUCESS = "DOC_UPLOADER_SUCESS";
export const DOC_UPLOADER_ERROR = "DOC_UPLOADER_ERROR";

export const docUpload = () => {
  return { type: DOC_UPLOADER };
};

export const docUploadSuccess = payload => {
  return { type: DOC_UPLOADER_SUCESS, payload };
};

export const docUploadError = payload => {
  return { type: DOC_UPLOADER_ERROR, payload };
};
