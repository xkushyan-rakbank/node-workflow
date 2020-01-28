export const checkIsAccountInfoTypeNumber = (authorityTypeValue, datalist) => {
  const fieldConfig = datalist.authorityType;
  const authorityTypeFromDatalist =
    (fieldConfig || []).find(item => item.value === authorityTypeValue) || {};

  return authorityTypeFromDatalist.displayText || "";
};
