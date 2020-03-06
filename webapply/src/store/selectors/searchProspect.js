import get from "lodash/get";
import { createSelector } from "reselect";
import { getProspectId } from "./appConfig";

export const getSearchResults = state => state.searchProspect.searchResults;
export const getProspectOverview = state => state.searchProspect.prospectOverview;
export const getProspectOverviewId = state => getProspectOverview(state).generalInfo.prospectId;
export const getOverviewDocuments = state => getProspectOverview(state).documents;
export const getOverviewSignatories = state => getProspectOverview(state).signatoryInfo;
export const getOverviewOrganizationInfo = state => getProspectOverview(state).organizationInfo;
export const getOverviewApplicationInfo = state => getProspectOverview(state).applicationInfo;

export const getIsEditableStatusSearchInfo = state => state.searchProspect.isApplyEditApplication;
export const getIsLoadingSearchProspects = state => state.searchProspect.isSearchLoading;
export const getSearchResultById = state => {
  const searchResults = getSearchResults(state);
  const prospectId = getProspectId(state);
  return (searchResults || []).find(item => item.prospectId === prospectId) || {};
};
export const getProspectStatus = state => get(getSearchResultById(state), "status.statusNotes");
export const getSearchResultsStatuses = createSelector(
  getSearchResults,
  searchResults =>
    searchResults.map(result => ({
      prospectId: result.prospectId,
      status: result.status.statusNotes
    }))
);
export const getErrorCode = state => state.searchProspect.errorCode;
