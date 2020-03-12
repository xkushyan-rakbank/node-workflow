import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAccountType, getIsIslamicBanking } from "../../store/selectors/appConfig";
import routes from "../../routes";
import { accountNames } from "../../constants";
import { STANDART, ELITE, ISLAMIC, NONE } from "./constants";

export const useBlobColor = (isHideSideBar = false) => {
  const {
    location: { pathname }
  } = useHistory();
  const accountType = useSelector(getAccountType);
  const isIslamicBanking = useSelector(getIsIslamicBanking);
  const isAccountsComparison = routes.accountsComparison === pathname;

  if (isHideSideBar) return NONE;
  if (!isAccountsComparison && accountType === accountNames.elite) return ELITE;
  if (!isAccountsComparison && isIslamicBanking) return ISLAMIC;
  return STANDART;
};
