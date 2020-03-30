import {getDatalist, getProspect, getSignatoryModel, getSignatories, getAccountInfo, getAccountNumbers, getOrganizationInfo, getCompanyName, getOrgKYCDetails, getGeneralInfo, getApplicantInfo, getSendProspectToAPIInfo, getIsSendingProspect, getScreeningError, getApplicationInfo, getIsIslamicBanking, getAccountType, getCompanySteps, getSignatoriesSteps, getProspectId, getReCaptchaSiteKey, getServicePricingGuideUrl, getUrlsReadMore, getAuthToken, getAuthorizationHeader, getIsRecaptchaEnable} from "../../src/store/selectors/appConfig";

describe("appConfig selector test", () => {
   const state = {appConfig: {}};

   it("should return data list", () => {
      state.appConfig.datalist = {countryOfIncorporation: [{
         displayText: "Afghanistan"}]};
      expect(getDatalist(state).countryOfIncorporation).toMatchObject([{
         displayText: "Afghanistan"}]);
   }) ;

   it("should return prospect", () => {
      state.appConfig.prospect = {applicantInfo: {fullName:"John Dou"}, generalInfo: {}, applicationInfo: {}};
      expect(getProspect(state).applicantInfo).toMatchObject({fullName:"John Dou"});
   });

   it("should return signatoryModel", () => {
      state.appConfig.signatoryModel = {
         salutation:"MR.",
         signatoryId:"",
         gender:"MR."};
      expect(getSignatoryModel(state)).toMatchObject({
         salutation:"MR.",
         signatoryId:"",
         gender:"MR."});
   });

   it("should return signatoryInfo", () => {
      state.appConfig.prospect.signatoryInfo = [{testSignatoryInfoField: "some text"}];
      expect(getSignatories(state)).toMatchObject([{testSignatoryInfoField: "some text"}]);
   });

   it("should return accountInfo", () => {
      state.appConfig.prospect.accountInfo = [{testAccountInfoField: "some text"}];
      expect(getAccountInfo(state)).toMatchObject([{testAccountInfoField: "some text"}]);
   });

   it("should return accountNumbers", () => {
      state.accountNumbers = ["usd, uae"];
      expect(getAccountNumbers(state)).toMatchObject(["usd, uae"]);
   });

   it("should return organizationInfo", () => {
      state.appConfig.prospect.organizationInfo = {testDatalistField: "1"};
      expect(getOrganizationInfo(state)).toMatchObject({testDatalistField: "1"});
   });

   it("should return companyName", () => {
      state.appConfig.prospect.organizationInfo.companyName = "Test Company name";
      expect(getCompanyName(state)).toBe("Test Company name");
   });

   it("should return orgKYCDetails", () => {
      state.appConfig.prospect.orgKYCDetails = {testDatalistField: "1"};
      expect(getOrgKYCDetails(state)).toMatchObject({testDatalistField: "1"});
   });

   it("should return generalInfo", () => {
      state.appConfig.prospect.generalInfo = {prospectId: "123456"};
      expect(getGeneralInfo(state)).toMatchObject({prospectId: "123456"});
   });

   it("should return applicantInfo", () => {
      state.appConfig.prospect.applicantInfo = {
         fullName:"John Dou",
         email:"test@cc.cc",
         countryCode:"971",
         mobileNo:"056685458"
      };
      expect(getApplicantInfo(state)).toMatchObject({
         fullName:"John Dou",
         email:"test@cc.cc",
         countryCode:"971",
         mobileNo:"056685458"
      });
   });

   it("should return sendProspectToAPI", () => {
      state.sendProspectToAPI = {loading: false};
      expect(getSendProspectToAPIInfo(state)).toMatchObject({loading: false});
   });

   it("should return loading field value", () => {
      state.sendProspectToAPI = {loading: true};
      expect(getIsSendingProspect(state)).toBe( true);
   });

   it("should return screeningError", () => {
      state.sendProspectToAPI = {screeningError: "error"};
      expect(getScreeningError(state)).toBe( "error");
   });

   it("should return applicationInfo", () => {
      state.appConfig.prospect.applicationInfo = {islamicBanking: false, accountType: "elite"};
      expect(getApplicationInfo(state)).toMatchObject( {islamicBanking: false, accountType: "elite"});
   });

   it("should return value islamicBanking", () => {
      state.appConfig.prospect.applicationInfo = {islamicBanking: true, accountType: "elite"};
      expect(getIsIslamicBanking(state)).toBe( true);
   });

   it("should return value accountType", () => {
      state.appConfig.prospect.accountType = {islamicBanking: true, accountType: "elite"};
      expect(getAccountType(state)).toBe( "elite");
   });

   it("should return final questions company steps ", () => {
      state.completedSteps = [{flowId:"companyInfo", step: 1, status: "COMPLETED"},
         {flowId: "finalQuestionsCompany", step: 1, status: "COMPLETED"},
         {flowId:"companySignatory_8", step:2, status:"NOT_AVAILABLE"}];
      expect(getCompanySteps(state)).toMatchObject( [{flowId: "finalQuestionsCompany", step: 1, status: "COMPLETED"}]);
   });

   it("should return Signatories company steps", () => {
      state.completedSteps = [{flowId:"companyInfo", step: 1, status: "COMPLETED"},
         {flowId: "finalQuestionsCompany", step: 1, status: "COMPLETED"},
         {flowId:"companySignatory_8", step:2, status:"NOT_AVAILABLE"}];
      expect(getSignatoriesSteps(state)).toMatchObject( [{flowId:"companySignatory_8", step:2, status:"NOT_AVAILABLE"}]);
   });

   it("should return ProspectId", () => {
      state.appConfig.prospect.generalInfo = {prospectId: "17683"};
      expect(getProspectId(state)).toBe( "17683");
   });

   it("should return ReCaptchaSiteKey", () => {
      state.appConfig.reCaptchaSiteKey = "somespecialstring";
      expect(getReCaptchaSiteKey(state)).toBe( "somespecialstring");
   });

   it("should return ServicePricingGuideUrl", () => {
      state.appConfig.servicePricingGuideUrl = "https://dsd.sdsd.we/dss";
      expect(getServicePricingGuideUrl(state)).toBe( "https://dsd.sdsd.we/dss");
   });

   it("should return UrlsReadMore", () => {
      state.appConfig = {
         rakValuePlusReadMoreUrl: "https://rakValuePlusReadMoreUrl.we/dss",
         rakValueMaxReadMoreUrl: "https://rakValueMaxReadMoreUrl.we/dss",
         rakValuePlusIslamicReadMoreUrl: "https://rakValuePlusIslamicReadMoreUrl.sdsd.we/dss",
         rakValueMaxIslamicReadMoreUrl: "https://rakValueMaxIslamicReadMoreUrl.sdsd.we/dss"
      };
      expect(getUrlsReadMore(state).rakValuePlusReadMoreUrl).toBe( "https://rakValuePlusReadMoreUrl.we/dss");
      expect(getUrlsReadMore(state).rakValueMaxReadMoreUrl).toBe( "https://rakValueMaxReadMoreUrl.we/dss");
      expect(getUrlsReadMore(state).rakValuePlusIslamicReadMoreUrl).toBe( "https://rakValuePlusIslamicReadMoreUrl.sdsd.we/dss");
      expect(getUrlsReadMore(state).rakValueMaxIslamicReadMoreUrl).toBe( "https://rakValueMaxIslamicReadMoreUrl.sdsd.we/dss");
   });

   it("should return AuthToken", () => {
      state.appConfig.authorizationToken = "some secret string";
      expect(getAuthToken(state)).toBe( "some secret string");
   });

   it("should return IsRecaptchaEnable", () => {
      state.appConfig.recaptchaEnable = true;
      expect(getIsRecaptchaEnable(state)).toBe( true);
   });


});