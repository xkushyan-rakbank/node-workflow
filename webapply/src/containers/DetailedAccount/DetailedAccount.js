import React, { useContext } from "react";

import { VerticalPaginationContext } from "../../components/VerticalPagination";
import { DetailedAccountComponent } from "./components/DetailedAccount";
import { useAccountTypeByPathname } from "../../utils/useAccountTypeByPathname";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";

export const DetailedAccount = () => {
  const { accountType, isIslamicBanking } = useAccountTypeByPathname();
  const { setCurrentSection } = useContext(VerticalPaginationContext);
  useFormNavigation([true, false]);

  return (
    <DetailedAccountComponent
      accountType={accountType}
      isIslamicBanking={isIslamicBanking}
      setCurrentSection={setCurrentSection}
    />
  );
};
