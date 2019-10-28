export const RETRIEVE_DOC_UPLOADER = "RETRIEVE_DOC_UPLOADER";
export const UPLOAD_SUCCESS = "UPLOAD_SUCCESS";

export const retrieveDocDetails = () => {
  return { type: RETRIEVE_DOC_UPLOADER };
};

export const docUploadSuccess = (payload, docDetails) => {
  return { type: "UPLOAD_SUCCESS", payload, docDetails };
};
