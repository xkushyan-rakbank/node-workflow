import React from "react";

import { VerticalPagination } from "../../components/VerticalPagination";
import { AccountBenefits } from "./AccountBenefits";
import { AccountingSoftware } from "./AccountingSoftware";
import { getVideoByAccountType } from "../../utils/getVideoByAccountType";
import { useAccountTypeByPathname } from "../../utils/useAccountTypeByPathname";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";

export const DetailedAccount = () => {
  const { accountType, isIslamicBanking } = useAccountTypeByPathname();
  useFormNavigation([true, false]);

  return (
    <>
      <VerticalPagination video={getVideoByAccountType(accountType, isIslamicBanking)}>
        <AccountBenefits />
        <AccountingSoftware />
      </VerticalPagination>
    </>
  );
};
