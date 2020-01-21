export const checkIsAccountInfoTypeNumber = (authorityTypeValue, uiConfig) => {
  if (isNaN(Number(authorityTypeValue))) {
    return authorityTypeValue;
  }

  const fieldConfig = Object.values(uiConfig).find(item => item.datalistId === "authorityType");
  const authorityTypeFromDatalist =
    (fieldConfig.datalist || []).find(item => item.value === authorityTypeValue) || {};

  return authorityTypeFromDatalist.displayText || "";
};
