export const getApplicantInfo = state =>
  state.retrieveApplicantInfo.searchResults.searchResult || {};

export const getApplicantProspectInfo = state => state.retrieveApplicantInfo.prospectResults;

export const getLoadingProspectId = state => state.retrieveApplicantInfo.loadingProspectId;
