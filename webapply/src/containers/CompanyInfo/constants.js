export const STEP_1 = 1;
export const STEP_2 = 2;
export const STEP_3 = 3;

export const MAX_COMPANY_SHORT_NAME_LENGTH = 50;
export const MAX_COMPANY_FULL_NAME_LENGTH = 255;
export const MAX_COMPANY_NAME_LENGTH = 50;
export const MAX_REGISTRATION_NUMBER_LENGTH = 15;
export const MAX_LICENSE_NUMBER_LENGTH = 25;
export const MAX_YEARS_IN_BUSINESS_LENGTH = 3;
export const MAX_INDUSTRIES_LENGTH = 12;
export const MAX_FULL_NAME_LENGTH = 100;

export const COMPANY_INFO_PAGE_ID = "companyInfo";

export const COUNTRY_CODE_UAE = "AE";

export const blackListedAuthoritiesForUAE = {
  OS: { code: "OS", displayText: "Overseas", key: "OS", subGroup: null, value: "OS" },
  RAKE: { code: "RAKE", displayText: "RAKICC", key: "RAKE", subGroup: null, value: "RAKE" }
};
export const REGEX_LLC_PATTERN = /(?:Limited Liability Company)|((?:LLC)|(?:L.L.C)|(?:llc)|(?:L L C))$/i;
