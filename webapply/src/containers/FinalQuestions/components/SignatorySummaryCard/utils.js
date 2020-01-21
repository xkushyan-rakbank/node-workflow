import get from "lodash/get";

export const checkIsAccountInfoTypeNumber = (authorityTypeValue, uiConfig) => {
  const isAuthorityTypeNaN = isNaN(Number(authorityTypeValue));
  if (!isAuthorityTypeNaN) {
    const fieldConfig = Object.values(uiConfig).find(item => item.datalistId === "authorityType");
    const authorityTypeFromDatalist = get(fieldConfig, "datalist", []).find(
      item => item.value === authorityTypeValue
    );

    return {
      authorityTypeValue: get(authorityTypeFromDatalist, "displayText", "")
    };
  }
  return { authorityTypeValue };
};
