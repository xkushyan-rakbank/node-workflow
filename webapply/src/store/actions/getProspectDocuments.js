export const RETRIEVE_DOC_UPLOADER = "RETRIEVE_DOC_UPLOADER";
export const DOC_UPLOADER = "DOC_UPLOADER";
export const EXTRA_DOC_UPLOAD_SUCCESS = "EXTRA_DOC_UPLOAD_SUCCESS";
export const DELETE_EXTRA_DOC_UPLOAD_SUCCESS = "DELETE_EXTRA_DOC_UPLOAD_SUCCESS";

export const retrieveDocDetails = () => {
  return { type: RETRIEVE_DOC_UPLOADER };
};

export const docUpload = (props, selectedFile, data, prospectId, setProgress) => {
  return { type: DOC_UPLOADER, props, selectedFile, data, prospectId, setProgress };
};

export const extraDocUploadSuccess = payload => {
  return { type: EXTRA_DOC_UPLOAD_SUCCESS, payload };
};

export const deleteExtraDocUploadSuccess = payload => {
  return { type: DELETE_EXTRA_DOC_UPLOAD_SUCCESS, payload };
};
