import get from "lodash/get";
import { getProspectId } from "./appConfig";

export const getSearchResults = state => state.searchProspect.searchResults;
export const getIsEditableStatusSearchInfo = state => state.searchProspect.isApplyEditApplication;
export const getIsLoadingSearchProspects = state => state.searchProspect.isSearchLoading;
export const getSearchResultById = state => {
  const searchResults = getSearchResults(state);
  const prospectId = getProspectId(state);
  return (searchResults || []).find(item => item.prospectId === prospectId) || {};
};
export const getProspectStatus = state => get(getSearchResultById(state), "status.statusNotes");
export const getIsUserInformedROEditStatus = state => state.searchProspect.isLockStatusByROAgent;
