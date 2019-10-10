export const DOC_UPLOADER = "DOC_UPLOADER";
export const DOC_UPLOADER_SUCESS = "DOC_UPLOADER_SUCESS";
export const DOC_UPLOADER_ERROR = "DOC_UPLOADER_ERROR";

export const DOC_UPLOADER_COUNT = "DOC_UPLOADER_COUNT";

export const docUpload = () => {
  return { type: DOC_UPLOADER };
};

export const docUploadSuccess = payload => {
  return { type: DOC_UPLOADER_SUCESS, payload };
};

export const docUploadError = payload => {
  return { type: DOC_UPLOADER_ERROR, payload };
};

//count the total number of Docs to be uploaded

// export const docUploadCount = (docUploadCOunt) => {
//   return (dispatch) => {
//       dispatch({
//           type: "DOC_UPLOADER_COUNT",
//           docUploadCOunt
//       })

//   }
// }
