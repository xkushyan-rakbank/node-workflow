export const getAuthorityTypeDisplayText = (authorityTypeValue, authorityTypeDatalist = []) => {
  const authorityTypeFromDatalist =
    authorityTypeDatalist.find(item => item.value === authorityTypeValue) || {};

  return authorityTypeFromDatalist.displayText || "";
};
