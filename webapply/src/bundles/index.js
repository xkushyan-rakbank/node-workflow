import { lazy } from "react";

export const components = {
  FinalQuestions: lazy(() =>
    import("../containers/FinalQuestions/index").then(module => ({
      default: module.FinalQuestions
    }))
  ),
  SelectServices: lazy(() =>
    import("../containers/SelectServices").then(module => ({ default: module.SelectServices }))
  ),
  DetailedAccount: lazy(() =>
    import("../containers/DetailedAccount/DetailedAccount").then(module => ({
      default: module.DetailedAccount
    }))
  ),
  ApplicationOverview: lazy(() =>
    import("../containers/ApplicationOverview/ApplicationOverview").then(module => ({
      default: module.ApplicationOverview
    }))
  ),
  ApplicationSubmitted: lazy(() =>
    import("../containers/ApplicationSubmitted/ApplicationSubmitted").then(module => ({
      default: module.ApplicationSubmitted
    }))
  ),
  MyApplications: lazy(() =>
    import("../containers/MyApplications").then(module => ({ default: module.MyApplications }))
  ),
  ComeBackVerification: lazy(() =>
    import("../containers/ComeBack/ComeBackVerification").then(module => ({
      default: module.ComeBackVerification
    }))
  ),
  ComeBackLogin: lazy(() =>
    import("../containers/ComeBack/ComeBackLogin").then(module => ({
      default: module.ComeBackLogin
    }))
  ),
  SubmitApplication: lazy(() =>
    import("../containers/SelectServices/components/SubmitApplication").then(module => ({
      default: module.SubmitApplication
    }))
  ),
  ReUploadDocuments: lazy(() =>
    import("../containers/ReUploadDocuments").then(module => ({ default: module.EditApplication }))
  ),
  ApplicantInfo: lazy(() =>
    import("../containers/AplicantInfo/ApplicantInfo").then(module => ({
      default: module.ApplicantInfo
    }))
  ),
  CompanyInfo: lazy(() =>
    import("../containers/CompanyInfo/CompanyInfo").then(module => ({
      default: module.CompanyInfo
    }))
  ),
  Login: lazy(() =>
    import("../containers/AgentPages/Login").then(module => ({ default: module.Login }))
  ),
  CompanyStakeholders: lazy(() =>
    import("../containers/CompanyStakeholders/CompanyStakeholders").then(module => ({
      default: module.CompanyStakeholders
    }))
  ),
  FormConfirm: lazy(() =>
    import("../containers/FormConfirm/FormConfirm").then(module => ({
      default: module.FormConfirm
    }))
  ),
  SearchProspect: lazy(() =>
    import("../containers/AgentPages/SearchProspect").then(module => ({
      default: module.SearchProspect
    }))
  ),
  UploadDocuments: lazy(() =>
    import("../containers/UploadDocuments").then(module => ({ default: module.UploadDocuments }))
  ),
  SearchedAppInfo: lazy(() =>
    import("../containers/AgentPages/SearchedAppInfo").then(module => ({
      default: module.SearchedAppInfo
    }))
  )
};
