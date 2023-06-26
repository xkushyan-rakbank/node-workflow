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
  verifyOtp: `${smeBaseName}/VerifyOTP`,
  companyInfo: `${smeBaseName}/CompanyInfo`,
  stakeholdersInfo: `${smeBaseName}/StakeholdersInfo`,
  finalQuestions: `${smeBaseName}/FinalQuestions`,
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
  applicationRedirect: `${smeBaseName}/application-redirect`
};
