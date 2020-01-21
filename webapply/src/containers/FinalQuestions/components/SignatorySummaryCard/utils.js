export const checkIsAccountInfoTypeNumber = (authorityTypeValue, uiConfig) => {
  const isAuthorityTypeNaN = isNaN(Number(authorityTypeValue));
  if (!isAuthorityTypeNaN) {
    const fieldConfig = Object.values(uiConfig).find(item => item.datalistId === "authorityType");
    const authorityTypeFromDatalist = (fieldConfig.datalist || []).find(
      item => item.value === authorityTypeValue
    );

    return authorityTypeFromDatalist ? authorityTypeFromDatalist.displayText || "" : "";
  }
  return authorityTypeValue;
};
