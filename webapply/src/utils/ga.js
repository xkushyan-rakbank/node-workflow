export const GA = {
  triggerEvent: ({ event, accountType }) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ProductName: accountType });
  }
};

export const GA_EVENTS = {
  PRODUCT_PAGE: "ProductPage", // ???
  PRODUCT_REVIEW_PAGE: "ProductReviewPage", // ???
  PRODUCT_APPLY: "ProductApply",
  PRODUCT_START: "ProductStart",
  PRODUCT_BASIC_INFORMATION: "ProductBasicInformation",
  PRODUCT_OTP_SUBMITTED: "Product_OTP-Submitted",
  COMPANY_INFORMATION_DETAILS_CONTINUE: "CompanyInformation_Details_Continue",
  COMPANY_INFORMATION_INDUSTRY_CONTINUE: "CompanyInformation_Industry_Continue",
  COMPANY_INFORMATION_LICENSE_CONTINUE: "CompanyInformation_License_Continue",
  COMPANY_INFORMATION_SUBMITTED: "CompanyInformation_Submitted",
  COMPANY_STAKEHOLDER_PERSONAL_INFORMATION_CONTINUE:
    "CompanyStakeholder_PersonalInformation_Continue",
  COMPANY_STAKEHOLDER_SIGNATORY_RIGHTS_CONTINUE: "CompanyStakeholder_SignatoryRights_Continue",
  COMPANY_STAKEHOLDER_SHAREHOLDING_CONTINUE: "CompanyStakeholder_ShareHolding_Continue",
  COMPANY_STAKEHOLDER_NATIONALITY_CONTINUE: "CompanyStakeholder_Nationality_Continue",
  COMPANY_STAKEHOLDER_COUNTRY_OF_RESIDENCE_CONTINUE:
    "CompanyStakeholder_CountryOfResidence_Continue",
  COMPANY_STAKEHOLDER_PREFERRED_CONTACT_CONTINUE: "CompanyStakeholder_PreferredContact_Continue",
  COMPANY_STAKEHOLDER_ADD_NEW_CONTINUE: "CompanyStakeholder_AddNew_Continue",
  COMPANY_STAKEHOLDER_SUBMITTED: "CompanyStakeholder_Submitted",
  FINAL_QUESTION_BUSINESS_RELATIONSHIPS_CONTINUE: "FinalQuestion_BusinessRelationships_Continue",
  FINAL_QUESTION_BRANCHES_CONTINUE: "FinalQuestion_Branches_Continue",
  FINAL_QUESTION_ANTICIPATED_CONTINUE: "FinalQuestion_Anticipated_Continue",
  FINAL_QUESTION_PREFERRED_MAILING_ADDRESS_CONTINUE:
    "FinalQuestion_PreferredMailingAddress_Continue",
  FINAL_QUESTION_PREFERRED_CONTACT_CONTINUE: "FinalQuestion_PreferredContact_Continue",
  FINAL_QUESTION_PERSONAL_INFORMATION_CONTINUE: "FinalQuestion_PersonalInformation_Continue",
  FINAL_QUESTION_EMPLOYMENT_CONTINUE: "FinalQuestion_EmploymentDetails_Continue",
  FINAL_QUESTION_SOURCE_OF_FUND_CONTINUE: "FinalQuestion_SourceOfFund_Continue",
  FINAL_QUESTION_SOURCE_OF_FUND_SUBMITTED: "FinalQuestion_SourceOfFund_Submitted", // ???
  SELECT_SERVICE_ACCOUNT_DETAILS_CONTINUE: "SelectService_AccountDetails_Continue",
  SELECT_SERVICE_SIGNING_PREFERENCE_CONTINUE: "SelectService_SigningPreference_Continue",
  SELECT_SERVICE_CHANNELS_CONTINUE: "SelectService_Channels_Continue",
  SELECT_SERVICE_KEEP_PLUS_UPGRADE_CONTINUE: "SelectService_KeepPlus_Upgrade_Continue",
  SELECT_SERVICE_SUBMITTED: "SelectService_Submitted",
  FORM_SUBMITTED: "FormSubmitted",
  COMEBACK_START: "ComeBackStart",
  COMEBACK_OTP_SUBMITTED: "ComeBack_OTP_Submitted"
};
