export const smeBaseName = "/business";
export const agentBaseName = "/agent";

export default {
  ApplicationSubmitted: `${smeBaseName}/ApplicationSubmitted`,
  MyApplications: `${smeBaseName}/MyApplications`,
  comeBackLoginVerification: `${smeBaseName}/ComeBackVerification`,
  comeBackLogin: `${smeBaseName}/ComeBackLogin`,
  quickapplyLanding: `${smeBaseName}`,
  accountsComparison: `${smeBaseName}/accounts`,
  applicationOverview: `${smeBaseName}/accounts/:accountType/application-overview`,
  detailedAccount: `${smeBaseName}/accounts/:accountType`,
  applicantInfo: `${smeBaseName}/ApplicantInfo`,
  verifyMobileOtp: `${smeBaseName}/VerifyMobileOTP`,
  verifyEmailOtp: `${smeBaseName}/VerifyEmailOTP`,
  companyInfo: `${smeBaseName}/CompanyInfo`,
  stakeholdersInfo: `${smeBaseName}/StakeholdersInfo`,
  stakeholdersPreview: `${smeBaseName}/StakeholdersInfoPreview`,
  StakeholderTermsAndConditions: `${smeBaseName}/ConsentInfo`,
  finalQuestions: `${smeBaseName}/FinalQuestions`,
  additionalInfoComponent: `${smeBaseName}/AdditionalInfo`,
  uploadDocuments: `${smeBaseName}/UploadDocuments`,
  reUploadDocuments: `${smeBaseName}/ReUploadDocuments`,
  selectServices: `${smeBaseName}/SelectServices`,
  searchProspect: `${agentBaseName}/SearchProspect`,
  login: `${agentBaseName}/Login`,
  SubmitApplication: `${smeBaseName}/SubmitApplication`,
  SearchedAppInfo: `${agentBaseName}/SearchedAppInfo/:id`,
  inviteCustomer: `${agentBaseName}/InviteCustomer`,
  //ro-assist-brd2-3
  currentAccount: `${smeBaseName}/accounts/current-account`,
  personaSelection: `${smeBaseName}/accounts/:accountType/persona-selection`,
  webToMobile: `${smeBaseName}/wtm`,
  additionalCompanyInformation: `${smeBaseName}/AdditionalInfo/additional-company-information`,
  // eslint-disable-next-line max-len
  additionalStakeholderInformation: `${smeBaseName}/AdditionalInfo/additional-stakeholder-information`
};
