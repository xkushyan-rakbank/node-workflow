import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getAccountType, getIsIslamicBanking } from "../../store/selectors/appConfig";
import routes from "../../routes";
import { accountNames } from "../../constants";
import { STANDART, ELITE, ISLAMIC, NONE } from "./constants";

export const useBlobColor = (isHideSideBar = false) => {
  const { pathname } = useLocation();
  const accountType = useSelector(getAccountType);
  const isIslamicBanking = useSelector(getIsIslamicBanking);
  const isAccountsComparison = routes.quickapplyLanding === pathname;
  const isComeback = pathname.indexOf(routes.comeBackLogin) >= 0;

  if (isHideSideBar) return NONE;
  if (isComeback) return STANDART;
  if (!isAccountsComparison && accountType === accountNames.elite) return ELITE;
  if (!isAccountsComparison && isIslamicBanking) return ISLAMIC;
  return STANDART;
};
