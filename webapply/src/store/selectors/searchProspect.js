export const getSearchResult = state => state.searchProspect.searchResults || {};
export const getSearchResults = state => getSearchResult(state).searchResults || [];
export const getCurrentProspect = state => state.searchProspect.currentProspect || {};
export const getIsEditableStatusSearchInfo = state => state.searchProspect.isApplyEditApplication;
export const getIsLoadingSearchProspects = state => state.searchProspect.isSearchLoading;
