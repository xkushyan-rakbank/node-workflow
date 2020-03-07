export const getUploadDocuments = state => state.uploadDocuments;

export const getProgress = state => getUploadDocuments(state).progress;

export const getUploadErrors = state => getUploadDocuments(state).uploadErrors;

export const getProspectDocuments = state => state.appConfig.prospect.documents || {};

export const getOtherDocuments = state => getProspectDocuments(state).otherDocuments || [];

export const getisLoadingDocuments = state => state.uploadDocuments.isLoading;

const UPLOADED_STATE = "Uploaded";

const checkIfRequiredDocsUploaded = docs =>
  docs.length && docs.filter(doc => doc.required).every(doc => doc.uploadStatus === UPLOADED_STATE);

export const getIsRequiredDocsUploaded = state => {
  const { companyDocuments = [], stakeholdersDocuments = {} } = getProspectDocuments(state);
  const stakeholdersDocsFlattened = Object.values(stakeholdersDocuments)
    .reduce((acc, { documents }) => {
      acc.push(documents);
      return acc;
    }, [])
    .flat();
  const isRequiredDocsUploaded = checkIfRequiredDocsUploaded([
    ...companyDocuments,
    ...stakeholdersDocsFlattened
  ]);

  return isRequiredDocsUploaded;
};
