import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import VerticalPaginationWrapper from "../../components/VerticalPaginationWrapper";
import IslamicBankingSwitcher from "../../components/IslamicBankingSwitcher/IslamicBankingSwitcher";
import { AccountBenefits } from "./AccountBenefits";
import { AccountingSoftware } from "./AccountingSoftware";

import routes from "../../routes";
import { getApplicationInfo } from "../../store/selectors/appConfig";
import { getVideoByAccountType } from "../../utils/getVideoByAccountType";

export const DetailedAccount = () => {
  const { accountType, islamicBanking } = useSelector(getApplicationInfo);
  const history = useHistory();

  if (!accountType) {
    history.push(routes.accountsComparison);
    return null;
  }

  return (
    <>
      <div className="hide-on-mobile">
        <IslamicBankingSwitcher />
      </div>
      <VerticalPaginationWrapper video={getVideoByAccountType(accountType, islamicBanking)}>
        <div />
        <AccountBenefits accountType={accountType} />
        <AccountingSoftware accountType={accountType} />
      </VerticalPaginationWrapper>
    </>
  );
};
