export const getAuthorityTypeDisplayText = (authorityTypeValue, datalist) => {
  const authorityTypeDatalist = datalist.authorityType || [];
  const authorityTypeFromDatalist =
    authorityTypeDatalist.find(item => item.value === authorityTypeValue) || {};

  return authorityTypeFromDatalist.displayText || "";
};
