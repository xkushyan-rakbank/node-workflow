import map from "lodash/map";

import { checkIfRequiredDocsUploaded } from "../../utils/documents";

export const getUploadDocuments = state => state.uploadDocuments;

export const getProgress = state => getUploadDocuments(state).progress;

export const getUploadErrors = state => getUploadDocuments(state).uploadErrors;

export const getProspectDocuments = state => state.appConfig.prospect.documents;

export const getOtherDocuments = state => getProspectDocuments(state).otherDocuments || [];

export const isLoadingDocuments = state => state.uploadDocuments.isLoading;

export const getRequiredDocsUploadingStatus = state => {
  const documents = getProspectDocuments(state);

  if (!documents) return false;
  const stakeholdersDocs = map(documents.stakeholdersDocuments, s => s.documents).flat();

  const companyDocsStatus = checkIfRequiredDocsUploaded(documents.companyDocuments);
  const stakeholderDocsStatus = checkIfRequiredDocsUploaded(stakeholdersDocs);

  return companyDocsStatus && stakeholderDocsStatus;
};
