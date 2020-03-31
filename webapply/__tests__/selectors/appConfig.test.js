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
} from "../../src/store/selectors/appConfig";

describe("appConfig selector test", () => {
    it("should return data list", () => {
        const datalist = { country: [{ displayText: "Afghanistan" }] };
        expect(getDatalist({ appConfig: { datalist } }).country).toMatchObject([
            {
                displayText: "Afghanistan"
            }
        ]);
    });
    it("should return prospect", () => {
        expect(
            getProspect({
                appConfig: {
                    prospect: { prospectInfo: { fullName: "John Dou" } }
                }
            })
        ).toMatchObject({ prospectInfo: { fullName: "John Dou" } });
    });
    it("should return signatoryModel", () => {
        const signatoryModel = { someSignatoryModelField: "some value." };
        expect(getSignatoryModel({ appConfig: { signatoryModel } })).toMatchObject({
            someSignatoryModelField: "some value."
        });
    });
    it("should return signatoryInfo", () => {
        const signatoryInfo = [{ testSignatoryInfoField: "some text" }];
        expect(
            getSignatories({
                appConfig: { prospect: { signatoryInfo } }
            })
        ).toMatchObject([{ testSignatoryInfoField: "some text" }]);
    });
    it("should return accountInfo", () => {
        const accountInfo = [{ testAccountInfoField: "some text" }];
        expect(
            getAccountInfo({
                appConfig: { prospect: { accountInfo } }
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
                appConfig: { prospect: { organizationInfo } }
            })
        ).toMatchObject({ testDatalistField: "1" });
    });
    it("should return companyName", () => {
        const organizationInfo = { companyName: "Test Company name" };
        expect(
            getCompanyName({
                appConfig: { prospect: { organizationInfo } }
            })
        ).toBe("Test Company name");
    });
    it("should return orgKYCDetails", () => {
        const orgKYCDetails = { testDatalistField: "1" };
        expect(
            getOrgKYCDetails({
                appConfig: { prospect: { orgKYCDetails } }
            })
        ).toMatchObject({ testDatalistField: "1" });
    });
    it("should return generalInfo", () => {
        const generalInfo = { prospectId: "123456" };
        expect(
            getGeneralInfo({
                appConfig: { prospect: { generalInfo } }
            })
        ).toMatchObject({ prospectId: "123456" });
    });
    it("should return applicantInfo", () => {
        const applicantInfo = {
            applicantInfoField: "applicantInfo value"
        };
        expect(
            getApplicantInfo({
                appConfig: { prospect: { applicantInfo } }
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
                appConfig: { prospect: { applicationInfo } }
            })
        ).toMatchObject({ islamicBanking: false, accountType: "elite" });
    });
    it("should return value islamicBanking", () => {
        const applicationInfo = { islamicBanking: true, accountType: "elite" };
        expect(
            getIsIslamicBanking({
                appConfig: { prospect: { applicationInfo } }
            })
        ).toBe(true);
    });
    it("should return value accountType", () => {
        const applicationInfo = { islamicBanking: true, accountType: "elite" };
        expect(
            getAccountType({
                appConfig: { prospect: { applicationInfo } }
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
                appConfig: { prospect: { generalInfo } }
            })
        ).toBe("17683");
    });
    it("should return ReCaptchaSiteKey", () => {
        expect(
            getReCaptchaSiteKey({ appConfig: { reCaptchaSiteKey: "some special string" } })
        ).toBe("some special string");
    });
    it("should return ServicePricingGuideUrl", () => {
        expect(
            getServicePricingGuideUrl({
                appConfig: { servicePricingGuideUrl: "https://dsd.sdsd.we/dss" }
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
        expect(getUrlsReadMore({ appConfig: { ...urls } })).toEqual(urls);
    });
    it("should return AuthToken", () => {
        const authorizationToken = "some secret string" ;
        expect(getAuthToken({ appConfig: { authorizationToken } })).toBe(authorizationToken);
    });
    it("should return IsRecaptchaEnable", () => {
        expect(getIsRecaptchaEnable({ appConfig: { recaptchaEnable: true } })).toBe(true);
    });
});