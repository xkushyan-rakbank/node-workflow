import React from "react";
import { useSelector } from "react-redux";

import { VerticalPagination } from "../../components/VerticalPagination";
import IslamicBankingSwitcher from "../../components/IslamicBankingSwitcher/IslamicBankingSwitcher";
import { AccountBenefits } from "./AccountBenefits";
import { AccountingSoftware } from "./AccountingSoftware";

import { getAccountType, getIsIslamicBanking } from "../../store/selectors/appConfig";
import { getVideoByAccountType } from "../../utils/getVideoByAccountType";

export const DetailedAccount = () => {
  const isIslamicBaning = useSelector(getIsIslamicBanking);
  const accountType = useSelector(getAccountType);

  return (
    <>
      <div className="hide-on-mobile">
        <IslamicBankingSwitcher />
      </div>
      <VerticalPagination video={getVideoByAccountType(accountType, isIslamicBaning)}>
        <AccountBenefits />
        <AccountingSoftware />
      </VerticalPagination>
    </>
  );
};
