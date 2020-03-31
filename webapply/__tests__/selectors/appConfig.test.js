import {
  getDatalist,
  getProspect,
  getSignatoryModel,
  getSignatories,
  getAccountInfo,
  getOrganizationInfo,
  getCompanyName,
  getOrgKYCDetails,
  getGeneralInfo,
  getApplicantInfo,
  getApplicationInfo,
  getIsIslamicBanking,
  getAccountType,
  getProspectId,
  getReCaptchaSiteKey,
  getServicePricingGuideUrl,
  getUrlsReadMore,
  getAuthToken,
  getIsRecaptchaEnable
} from "../../src/store/selectors/appConfig";

describe("appConfig selector test", () => {
  const datalist = "some datalist";
  const signatoryModel = "some signatory model";
  const signatoryInfo = "some signatory info";
  const accountInfo = "some account info";
  const companyName = "some company name";
  const organizationInfo = { companyName };
  const orgKYCDetails = "some org kyc details";
  const prospectId = "some prospect id";
  const generalInfo = { prospectId };
  const applicantInfo = "some applicantInfo value";
  const islamicBanking = false;
  const accountType = "some account type";
  const applicationInfo = { islamicBanking, accountType };
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
  const recaptchaEnable = true;
  const state = {
    appConfig: {
      datalist,
      prospect,
      signatoryModel,
      signatoryInfo,
      reCaptchaSiteKey,
      servicePricingGuideUrl,
      ...readMoreUrls,
      authorizationToken,
      recaptchaEnable
    }
  };

  it("should return datalist", () => {
    expect(getDatalist(state)).toBe(datalist);
  });

  it("should return prospect", () => {
    expect(getProspect(state)).toBe(prospect);
  });

  it("should return signatoryModel", () => {
    expect(getSignatoryModel(state)).toBe(signatoryModel);
  });

  it("should return signatoryInfo", () => {
    expect(getSignatories(state)).toBe(signatoryInfo);
  });

  it("should return accountInfo", () => {
    expect(getAccountInfo(state)).toBe(accountInfo);
  });

  it("should return organizationInfo", () => {
    expect(getOrganizationInfo(state)).toBe(organizationInfo);
  });

  it("should return companyName", () => {
    expect(getCompanyName(state)).toBe(companyName);
  });

  it("should return orgKYCDetails", () => {
    expect(getOrgKYCDetails(state)).toBe(orgKYCDetails);
  });

  it("should return generalInfo", () => {
    expect(getGeneralInfo(state)).toBe(generalInfo);
  });

  it("should return applicantInfo", () => {
    expect(getApplicantInfo(state)).toBe(applicantInfo);
  });

  it("should return applicationInfo", () => {
    expect(getApplicationInfo(state)).toBe(applicationInfo);
  });

  it("should return value of islamicBanking", () => {
    expect(getIsIslamicBanking(state)).toBe(islamicBanking);
  });

  it("should return value of accountType", () => {
    expect(getAccountType(state)).toBe(accountType);
  });

  it("should return prospect id", () => {
    expect(getProspectId(state)).toBe(prospectId);
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

  it("should return is recaptcha enable", () => {
    expect(getIsRecaptchaEnable(state)).toBe(recaptchaEnable);
  });
});
