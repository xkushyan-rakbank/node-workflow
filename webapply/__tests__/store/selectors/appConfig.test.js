import set from "lodash/set";

import {
  getAgentName,
  getDatalist,
  getProspect,
  getSignatoryModel,
  getOrganizationInfoModel,
  getSignatories,
  getAccountInfo,
  getOrganizationInfo,
  getCompanyName,
  getOrgKYCDetails,
  getGeneralInfo,
  getApplicantInfo,
  getApplicantFullName,
  getApplicationInfo,
  getIsIslamicBanking,
  getAccountType,
  getProspectId,
  getReCaptchaSiteKey,
  getServicePricingGuideUrl,
  getUrlsReadMore,
  getAuthToken,
  getIsRecaptchaEnable,
  getAuthorizationHeader,
  getAppConfig,
  getSignatoriesCount,
  createGetAuthorityTypeDisplayText,
  getAccountCurrencies,
  getExpressTandC,
  getPrimaryMobCountryCode,
  getRakValuePackage,
  getLeadSource,
  getExpired,
  getDocumentUploadCnt,
  getRoCode
} from "../../../src/store/selectors/appConfig";

describe("appConfig selector test", () => {
  const agentName = "agent name";
  const displayText = "some text";
  const authorityTypeValue = "some value";
  const authorityTypeDatalist = [{ value: authorityTypeValue, displayText }];
  const datalist = { authorityType: authorityTypeDatalist };
  const signatoryModel = "some signatory model";
  const organizationInfoModel = "some organization Info model";
  const signatoryInfo = ["some signatory info"];
  const accountCurrencies = ["some currency"];
  const accountInfo = [{ accountCurrencies, expressTandC: true }];
  const companyName = "some company name";
  const primaryMobCountryCode = "some code";
  const contactDetails = { primaryMobCountryCode };
  const organizationInfo = { companyName, contactDetails };
  const orgKYCDetails = "some org kyc details";
  const prospectId = "some prospect id";
  const generalInfo = { prospectId };
  const fullName = "some name";
  const applicantInfo = { fullName };
  const islamicBanking = false;
  const accountType = "some account type";
  const rakValuePackage = "some package";
  const applicationInfo = { islamicBanking, accountType, rakValuePackage };
  const prospect = {
    signatoryInfo,
    accountInfo,
    organizationInfo,
    orgKYCDetails,
    generalInfo,
    applicantInfo,
    applicationInfo
  };
  const reCaptchaSiteKey = "some key";
  const servicePricingGuideUrl = "some url";
  const readMoreUrls = {
    rakValuePlusReadMoreUrl: "some url 1",
    rakValueMaxReadMoreUrl: "some url 2",
    rakValuePlusIslamicReadMoreUrl: "some url 3",
    rakValueMaxIslamicReadMoreUrl: "some url 4"
  };
  const authorizationToken = "some secret string";
  const expired = false;
  const productName = "any product";
  const leadSource = { productName };
  const roCode = "some roCode";
  const recaptchaEnable = true;
  const login = { userName: agentName };
  const appConfig = {
    login,
    datalist,
    prospect,
    signatoryModel,
    organizationInfoModel,
    signatoryInfo,
    reCaptchaSiteKey,
    servicePricingGuideUrl,
    ...readMoreUrls,
    authorizationToken,
    recaptchaEnable,
    leadSource,
    expired,
    roCode
  };
  const state = { appConfig };

  it("should return agent name", () => {
    expect(getAgentName(state)).toBe(agentName);
  });

  it("should return appConfig", () => {
    expect(getAppConfig(state)).toBe(appConfig);
  });

  it("should return empty object when appConfig is not set", () => {
    expect(getAppConfig({})).toEqual({});
  });

  it("should return datalist", () => {
    expect(getDatalist(state)).toBe(datalist);
  });

  it("should return empty object when datalist is not set", () => {
    expect(getDatalist({ appConfig: {} })).toEqual({});
  });

  it("should return prospect", () => {
    expect(getProspect(state)).toBe(prospect);
  });

  it("should return empty object when prospect is not set", () => {
    expect(getProspect({ appConfig: {} })).toEqual({});
  });

  it("should return signatoryModel", () => {
    expect(getSignatoryModel(state)).toBe(signatoryModel);
  });

  it("should return empty object when signatoryModel is not set", () => {
    expect(getSignatoryModel({ appConfig: {} })).toEqual({});
  });

  it("should return signatoryModel", () => {
    expect(getOrganizationInfoModel(state)).toBe(organizationInfoModel);
  });

  it("should return empty object when signatoryModel is not set", () => {
    expect(getOrganizationInfoModel({ appConfig: {} })).toEqual({});
  });

  it("should return signatoryInfo", () => {
    expect(getSignatories(state)).toBe(signatoryInfo);
  });

  it("should return signatories count", () => {
    expect(getSignatoriesCount(state)).toBe(1);
  });

  it("should return empty array when signatoryInfo is not set", () => {
    expect(getSignatories({ appConfig: {} })).toEqual([]);
  });

  it("should return accountInfo", () => {
    expect(getAccountInfo(state)).toBe(accountInfo);
  });

  it("should return empty array when accountInfo is not set", () => {
    expect(getAccountInfo({ appConfig: {} })).toEqual([]);
  });

  it("should return accountCurrencies", () => {
    expect(getAccountCurrencies(state)).toEqual(accountCurrencies);
  });

  it("should return empty string when accountCurrencies is not set", () => {
    expect(getAccountCurrencies({ appConfig: {} })).toEqual("");
  });

  it("should return expressTandC false, if not defined", () => {
    expect(getExpressTandC({ appConfig: {} })).toEqual(false);
  });

  it("should return expressTandC true if selected", () => {
    expect(getExpressTandC(state)).toEqual(true);
  });

  it("should return organizationInfo", () => {
    expect(getOrganizationInfo(state)).toBe(organizationInfo);
  });

  it("should return empty object when organizationInfo is not set", () => {
    expect(getOrganizationInfo({ appConfig: {} })).toEqual({});
  });

  it("should return primaryMobCountryCode", () => {
    expect(getPrimaryMobCountryCode(state)).toEqual(primaryMobCountryCode);
  });

  it("should return empty string when primaryMobCountryCode is not set", () => {
    expect(getPrimaryMobCountryCode({ appConfig: {} })).toEqual("");
  });

  it("should return companyName", () => {
    expect(getCompanyName(state)).toBe(companyName);
  });

  it("should return orgKYCDetails", () => {
    expect(getOrgKYCDetails(state)).toBe(orgKYCDetails);
  });

  it("should return empty object when orgKYCDetails is not set", () => {
    expect(getOrgKYCDetails({ appConfig: {} })).toEqual({});
  });

  it("should return generalInfo", () => {
    expect(getGeneralInfo(state)).toBe(generalInfo);
  });

  it("should return empty object when generalInfo is not set", () => {
    expect(getGeneralInfo({ appConfig: {} })).toEqual({});
  });

  it("should return empty object when generalInfo is not set", () => {
    expect(getGeneralInfo({ appConfig: {} })).toEqual({});
  });

  it("should return applicantInfo", () => {
    expect(getApplicantInfo(state)).toBe(applicantInfo);
  });

  it("should return empty object when applicantInfo is not set", () => {
    expect(getApplicantInfo({ appConfig: {} })).toEqual({});
  });

  it("should return applicationInfo", () => {
    expect(getApplicationInfo(state)).toBe(applicationInfo);
  });

  it("should return empty object when applicationInfo is not set", () => {
    expect(getApplicationInfo({ appConfig: {} })).toEqual({});
  });

  it("should return full name", () => {
    expect(getApplicantFullName(state)).toBe(fullName);
  });

  it("should return value of islamicBanking", () => {
    expect(getIsIslamicBanking(state)).toBe(islamicBanking);
  });

  it("should return value of accountType", () => {
    expect(getAccountType(state)).toBe(accountType);
  });

  it("should return value of rakValuePackage", () => {
    expect(getRakValuePackage(state)).toBe(rakValuePackage);
  });

  it("should return empty string when rakValuePackage is not set", () => {
    expect(getRakValuePackage({ appConfig: {} })).toBe("");
  });

  it("should return prospect id", () => {
    expect(getProspectId(state)).toBe(prospectId);
  });

  it("should return empty string if prospect id doesn't exist", () => {
    expect(getProspectId({ appConfig: {} })).toBe("");
  });

  it("should return recaptcha site key", () => {
    expect(getReCaptchaSiteKey(state)).toBe(reCaptchaSiteKey);
  });

  it("should return value of ServicePricingGuideUrl", () => {
    expect(getServicePricingGuideUrl(state)).toBe(servicePricingGuideUrl);
  });

  it("should return value of urlsReadMore", () => {
    expect(getUrlsReadMore(state)).toEqual(readMoreUrls);
  });

  it("should return auth token", () => {
    expect(getAuthToken(state)).toBe(authorizationToken);
  });

  it("should return auth headers", () => {
    expect(getAuthorizationHeader(state)).toEqual({
      headers: {
        Authorization: `Bearer ${authorizationToken}`
      }
    });
  });

  it("should return empty headers when authorizationToken is not set", () => {
    expect(getAuthorizationHeader({ appConfig: {} })).toEqual({
      headers: {}
    });
  });

  it("should return is recaptcha enable", () => {
    expect(getIsRecaptchaEnable(state)).toBe(recaptchaEnable);
  });

  it("should return displayText if value exist", () => {
    expect(createGetAuthorityTypeDisplayText(authorityTypeValue)(state)).toBe(displayText);
  });

  it("should return empty string if value does not exist", () => {
    expect(createGetAuthorityTypeDisplayText("another val")(state)).toBe("");
  });

  it("should return leadsource", () => {
    expect(getLeadSource(state)).toBe(productName);
  });

  it("should return roCode", () => {
    expect(getRoCode(state)).toBe(roCode);
  });

  it("should return empty roCode when roCode Undefined", () => {
    expect(getRoCode({ appConfig: {} })).toBe("");
  });

  it("should return expired", () => {
    expect(getExpired(state)).toBe(expired);
  });

  it("should return document upload limit", () => {
    expect(getDocumentUploadCnt(state)).toBe(0);
  });

  it("should return max document upload limitd", () => {
    let newState;
    const companyDocuments = [{ DocumentUploadCnt: 20, DocumentUplTotalCnt: 10 }];
    const documents = {
      companyDocuments
    };
    const newAppConfig = {
      prospect: { documents }
    };
    newState = set({}, "appConfig", newAppConfig);
    expect(getDocumentUploadCnt(newState)).toBe(20);
  });

  it("leadsource not defined", () => {
    let newState;

    const newAppConfig = {
      login,
      datalist,
      prospect,
      signatoryModel,
      signatoryInfo,
      reCaptchaSiteKey,
      servicePricingGuideUrl,
      ...readMoreUrls,
      authorizationToken,
      recaptchaEnable,
      expired: true
    };

    newState = set({}, "appConfig", newAppConfig);
    expect(getLeadSource(newState)).toBe("");
  });
});
