import React, { useContext } from "react";
import { useSelector } from "react-redux";

import { VerticalPaginationContext } from "../../components/VerticalPagination";
import { DetailedAccountComponent } from "./components/DetailedAccount";
import { useAccountTypeByPathname } from "../../utils/useAccountTypeByPathname";
import { useLayoutParams } from "../FormLayout";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { getAccountType } from "../../store/selectors/appConfig";

export const DetailedAccount = () => {
  const selectedAccountType = useSelector(getAccountType);
  const { accountType, isIslamicBanking } = useAccountTypeByPathname();
  const { setCurrentSection } = useContext(VerticalPaginationContext);
  useFormNavigation([true, false]);
  useLayoutParams(false, false, true);

  return (
    <DetailedAccountComponent
      accountType={accountType}
      isIslamicBanking={isIslamicBanking}
      setCurrentSection={setCurrentSection}
      selectedAccountType={selectedAccountType}
    />
  );
};
