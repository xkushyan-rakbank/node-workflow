import get from "lodash/get";
import { createSelector } from "reselect";
import { getProspectId } from "./appConfig";

export const getSearchProspect = state => state.searchProspect;

export const getSearchResults = state => getSearchProspect(state).searchResults;

export const getSearchError = state => getSearchProspect(state).searchError;

export const getSearchErrorDesc = state => getSearchProspect(state).searchErrorDesc;

export const getProspectOverview = state => getSearchProspect(state).prospectOverview;

export const getProspectOverviewId = state => getProspectOverview(state).generalInfo.prospectId;

export const getOverviewDocuments = state => getProspectOverview(state).documents;

export const getOverviewSignatories = state => getProspectOverview(state).signatoryInfo || [];

export const getFilledOverviewSignatories = createSelector(
  getOverviewSignatories,
  signatories =>
    signatories.filter(
      signatory => (signatory.firstName && signatory.lastName) || signatory.fullName
    )
);

export const getOverviewOrganizationInfo = state =>
  getProspectOverview(state).organizationInfo || [];

export const getOverviewApplicationInfo = state => getProspectOverview(state).applicationInfo || {};

export const getIsEditableStatusSearchInfo = state =>
  getSearchProspect(state).isApplyEditApplication || false;

export const getIsLoadingSearchProspects = state => getSearchProspect(state).isSearchLoading;

export const getSearchResultById = state => {
  const searchResults = getSearchResults(state);
  const prospectId = getProspectId(state);
  return (searchResults || []).find(item => item.prospectId === prospectId) || {};
};

export const getProspectStatus = state => get(getSearchResultById(state), "status.statusNotes");

export const getProspectStatusReason = state =>
  get(getSearchResultById(state), "status.statusReason");

export const getSearchResultsStatuses = createSelector(
  getSearchResults,
  searchResults =>
    searchResults.map(result => ({
      prospectId: result.prospectId,
      status: result.status.statusNotes,
      statusType: result.status.statusType
    }))
);

export const getViewIdOfSearchResultById = createSelector(
  getSearchResultById,
  searchResult => get(searchResult, "applicationInfo.viewId")
);

export const getErrorCode = state => getSearchProspect(state).errorCode;
