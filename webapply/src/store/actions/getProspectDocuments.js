export const RETRIEVE_DOC_UPLOADER = "RETRIEVE_DOC_UPLOADER";
export const UPLOAD_SUCCESS = "UPLOAD_SUCCESS";
export const EXTRA_DOC_UPLOAD_SUCCESS = "EXTRA_DOC_UPLOAD_SUCCESS";
export const DELETE_EXTRA_DOC_UPLOAD_SUCCESS = "DELETE_EXTRA_DOC_UPLOAD_SUCCESS";

export const retrieveDocDetails = () => {
  return { type: RETRIEVE_DOC_UPLOADER };
};

export const docUploadSuccess = (payload, docDetails) => {
  return { type: "UPLOAD_SUCCESS", payload, docDetails };
};

export const extraDocUploadSuccess = payload => {
  return { type: "EXTRA_DOC_UPLOAD_SUCCESS", payload };
};

export const deleteExtraDocUploadSuccess = payload => {
  console.log(payload);
  return { type: "DELETE_EXTRA_DOC_UPLOAD_SUCCESS", payload };
};
