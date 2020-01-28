export const checkIsAccountInfoTypeNumber = (authorityTypeValue, datalist) => {
  if (isNaN(Number(authorityTypeValue))) {
    return authorityTypeValue;
  }

  const fieldConfig = datalist.authorityType;
  const authorityTypeFromDatalist =
    (fieldConfig || []).find(item => item.value === authorityTypeValue) || {};

  return authorityTypeFromDatalist.displayText || "";
};
