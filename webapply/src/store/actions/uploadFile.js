export const UPLOAD_FILE = "UPLOAD_FILE";
export const UPLOAD_FILE_SUCCESS = "UPLOAD_FILE_SUCCESS";
export const UPLOAD_FILE_FAIL = "UPLOAD_FILE_FAIL";

export const uploadFile = () => {
  return { type: UPLOAD_FILE };
};

export const uploadFileSuccess = () => {
  return { type: UPLOAD_FILE_SUCCESS };
};

export const uploadFileFail = error => {
  return { type: UPLOAD_FILE_FAIL, error };
};
