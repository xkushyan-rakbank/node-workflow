import React from "react";
import { useHistory } from "react-router-dom";
import { useStore } from "react-redux";

import VerticalPaginationWrapper from "../../components/VerticalPaginationWrapper";
import IslamicBankingSwitcher from "../../components/IslamicBankingSwitcher/IslamicBankingSwitcher";
import AccountBenefits from "./AccountBenefits";
import { AccountingSoftware } from "./AccountingSoftware";

import routes from "../../routes";
import * as appConfigSelectors from "../../store/selectors/appConfig";

import { getCurrentVideoData } from "../../utils/video";

export const DetailedAccount = () => {
  const state = useStore().getState();
  const { accountType, islamicBanking } = appConfigSelectors.getApplicationInfo(state);

  const history = useHistory();
  if (!accountType) history.push(routes.accountsComparison);

  return (
    <>
      <div className="hide-on-mobile">
        <IslamicBankingSwitcher />
      </div>
      <VerticalPaginationWrapper
        currentVideo={getCurrentVideoData({ accountType, islamicBanking })}
      >
        <div />
        <AccountBenefits accountType={accountType} />
        <AccountingSoftware accountType={accountType} />
      </VerticalPaginationWrapper>
    </>
  );
};
