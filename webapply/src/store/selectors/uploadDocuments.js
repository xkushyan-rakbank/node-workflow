export const getUploadDocuments = state => state.uploadDocuments;

export const getProgress = state => getUploadDocuments(state).progress;

export const getUploadErrors = state => getUploadDocuments(state).uploadErrors;

export const getIsLoadingDocuments = state => getUploadDocuments(state).isLoading;
