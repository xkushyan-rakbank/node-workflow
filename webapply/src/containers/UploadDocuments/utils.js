export const getSearchResultById = (searchResults, prospectId) =>
  (searchResults || []).find(item => item.prospectId === prospectId);
