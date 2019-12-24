import { lazy } from "react";

export const components = {
  DetailedAccount: lazy(() =>
    import("../containers/DetailedAccount/DetailedAccount").then(module => ({
      default: module.DetailedAccount
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
  Login: lazy(() =>
    import("../containers/AgentPages/Login").then(module => ({ default: module.Login }))
  ),
  SearchProspect: lazy(() =>
    import("../containers/AgentPages/SearchProspect").then(module => ({
      default: module.SearchProspect
    }))
  ),
  SearchedAppInfo: lazy(() =>
    import("../containers/AgentPages/SearchedAppInfo").then(module => ({
      default: module.SearchedAppInfo
    }))
  )
};
