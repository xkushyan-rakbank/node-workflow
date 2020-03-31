import {
  getDatalist,
  getProspect,
  getSignatoryModel,
  getSignatories,
  getAccountInfo,
  getAccountNumbers,
  getOrganizationInfo,
  getCompanyName,
  getOrgKYCDetails,
  getGeneralInfo,
  getApplicantInfo,
  getSendProspectToAPIInfo,
  getIsSendingProspect,
  getScreeningError,
  getApplicationInfo,
  getIsIslamicBanking,
  getAccountType,
  getCompanySteps,
  getSignatoriesSteps,
  getProspectId,
  getReCaptchaSiteKey,
  getServicePricingGuideUrl,
  getUrlsReadMore,
  getAuthToken,
  getIsRecaptchaEnable
} from "../src/store/selectors/appConfig";

describe("appConfig selector test", () => {
  const appConfig = { prospect: {} };

  it("should return data list", () => {
    const datalist = { country: [{ displayText: "Afghanistan" }] };
    expect(getDatalist({ appConfig: { ...appConfig, datalist } }).country).toMatchObject([
      {
        displayText: "Afghanistan"
      }
    ]);
  });

  it("should return prospect", () => {
    expect(
      getProspect({
        appConfig: {
          ...appConfig,
          prospect: { ...appConfig.prospect, prospectInfo: { fullName: "John Dou" } }
        }
      })
    ).toMatchObject({ prospectInfo: { fullName: "John Dou" } });
  });

  it("should return signatoryModel", () => {
    const signatoryModel = { someSignatoryModelField: "some value." };
    expect(getSignatoryModel({ appConfig: { ...appConfig, signatoryModel } })).toMatchObject({
      someSignatoryModelField: "some value."
    });
  });

  it("should return signatoryInfo", () => {
    const signatoryInfo = [{ testSignatoryInfoField: "some text" }];
    expect(
      getSignatories({
        appConfig: { ...appConfig, prospect: { ...appConfig.prospect, signatoryInfo } }
      })
    ).toMatchObject([{ testSignatoryInfoField: "some text" }]);
  });

  it("should return accountInfo", () => {
    const accountInfo = [{ testAccountInfoField: "some text" }];
    expect(
      getAccountInfo({
        appConfig: { ...appConfig, prospect: { ...appConfig.prospect, accountInfo } }
      })
    ).toMatchObject([{ testAccountInfoField: "some text" }]);
  });

  it("should return accountNumbers", () => {
    expect(getAccountNumbers({ accountNumbers: ["usd, uae"] })).toMatchObject(["usd, uae"]);
  });

  it("should return organizationInfo", () => {
    const organizationInfo = { testDatalistField: "1" };
    expect(
      getOrganizationInfo({
        appConfig: { ...appConfig, prospect: { ...appConfig.prospect, organizationInfo } }
      })
    ).toMatchObject({ testDatalistField: "1" });
  });

  it("should return companyName", () => {
    const organizationInfo = { companyName: "Test Company name" };
    expect(
      getCompanyName({
        appConfig: { ...appConfig, prospect: { ...appConfig.prospect, organizationInfo } }
      })
    ).toBe("Test Company name");
  });

  it("should return orgKYCDetails", () => {
    const orgKYCDetails = { testDatalistField: "1" };
    expect(
      getOrgKYCDetails({
        appConfig: { ...appConfig, prospect: { ...appConfig.prospect, orgKYCDetails } }
      })
    ).toMatchObject({ testDatalistField: "1" });
  });

  it("should return generalInfo", () => {
    const generalInfo = { prospectId: "123456" };
    expect(
      getGeneralInfo({
        appConfig: { ...appConfig, prospect: { ...appConfig.prospect, generalInfo } }
      })
    ).toMatchObject({ prospectId: "123456" });
  });

  it("should return applicantInfo", () => {
    const applicantInfo = {
      applicantInfoField: "applicantInfo value"
    };
    expect(
      getApplicantInfo({
        appConfig: { ...appConfig, prospect: { ...appConfig.prospect, applicantInfo } }
      })
    ).toMatchObject({
      applicantInfoField: "applicantInfo value"
    });
  });

  it("should return sendProspectToAPI", () => {
    expect(getSendProspectToAPIInfo({ sendProspectToAPI: { loading: false } })).toMatchObject({
      loading: false
    });
  });

  it("should return loading field value", () => {
    expect(getIsSendingProspect({ sendProspectToAPI: { loading: true } })).toBe(true);
  });

  it("should return screeningError", () => {
    expect(getScreeningError({ sendProspectToAPI: { screeningError: "error" } })).toBe("error");
  });

  it("should return applicationInfo", () => {
    const applicationInfo = { islamicBanking: false, accountType: "elite" };
    expect(
      getApplicationInfo({
        appConfig: { ...appConfig, prospect: { ...appConfig.prospect, applicationInfo } }
      })
    ).toMatchObject({ islamicBanking: false, accountType: "elite" });
  });

  it("should return value islamicBanking", () => {
    const applicationInfo = { islamicBanking: true, accountType: "elite" };
    expect(
      getIsIslamicBanking({
        appConfig: { ...appConfig, prospect: { ...appConfig.prospect, applicationInfo } }
      })
    ).toBe(true);
  });

  it("should return value accountType", () => {
    const applicationInfo = { islamicBanking: true, accountType: "elite" };
    expect(
      getAccountType({
        appConfig: { ...appConfig, prospect: { ...appConfig.prospect, applicationInfo } }
      })
    ).toBe("elite");
  });

  it("should return final questions company steps ", () => {
    const completedSteps = [
      { flowId: "companyInfo", step: 1, status: "COMPLETED" },
      { flowId: "finalQuestionsCompany", step: 1, status: "COMPLETED" },
      { flowId: "companySignatory_8", step: 2, status: "NOT_AVAILABLE" }
    ];
    expect(getCompanySteps({ completedSteps })).toMatchObject([
      { flowId: "finalQuestionsCompany", step: 1, status: "COMPLETED" }
    ]);
  });

  it("should return Signatories company steps", () => {
    const completedSteps = [
      { flowId: "companyInfo", step: 1, status: "COMPLETED" },
      { flowId: "finalQuestionsCompany", step: 1, status: "COMPLETED" },
      { flowId: "companySignatory_8", step: 2, status: "NOT_AVAILABLE" }
    ];
    expect(getSignatoriesSteps({ completedSteps })).toMatchObject([
      { flowId: "companySignatory_8", step: 2, status: "NOT_AVAILABLE" }
    ]);
  });

  it("should return ProspectId", () => {
    const generalInfo = { prospectId: "17683" };
    expect(
      getProspectId({
        appConfig: { ...appConfig, prospect: { ...appConfig.prospect, generalInfo } }
      })
    ).toBe("17683");
  });

  it("should return ReCaptchaSiteKey", () => {
    expect(
      getReCaptchaSiteKey({ appConfig: { ...appConfig, reCaptchaSiteKey: "some special string" } })
    ).toBe("some special string");
  });

  it("should return ServicePricingGuideUrl", () => {
    expect(
      getServicePricingGuideUrl({
        appConfig: { ...appConfig, servicePricingGuideUrl: "https://dsd.sdsd.we/dss" }
      })
    ).toBe("https://dsd.sdsd.we/dss");
  });

  it("should return UrlsReadMore", () => {
    const urls = {
      rakValuePlusReadMoreUrl: "https://rakValuePlusReadMoreUrl.we/dss",
      rakValueMaxReadMoreUrl: "https://rakValueMaxReadMoreUrl.we/dss",
      rakValuePlusIslamicReadMoreUrl: "https://rakValuePlusIslamicReadMoreUrl.sdsd.we/dss",
      rakValueMaxIslamicReadMoreUrl: "https://rakValueMaxIslamicReadMoreUrl.sdsd.we/dss"
    };
    expect(getUrlsReadMore({ appConfig: { ...appConfig, ...urls } })).toMatchObject({ ...urls });
  });

  it("should return AuthToken", () => {
    expect(
      getAuthToken({ appConfig: { ...appConfig, authorizationToken: "some secret string" } })
    ).toBe("some secret string");
  });

  it("should return IsRecaptchaEnable", () => {
    expect(getIsRecaptchaEnable({ appConfig: { ...appConfig, recaptchaEnable: true } })).toBe(true);
  });
});
