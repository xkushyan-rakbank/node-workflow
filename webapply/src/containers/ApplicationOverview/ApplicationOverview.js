import React from "react";
import { connect } from "react-redux";

import { TwoSteps } from "./components/TwoSteps";

import { PreliminaryInformation } from "./components/PreliminaryInformation";
import VerticalPaginationWrapper from "../../components/VerticalPaginationWrapper";
import * as appConfigSelectors from "../../store/selectors/appConfig";

const ApplicationOverviewComponent = ({ applicationInfo }) => {
  const { accountType, islamicBanking } = applicationInfo;
  return (
    <VerticalPaginationWrapper>
      <TwoSteps accountType={accountType} islamicBanking={islamicBanking} withHeader />
      <PreliminaryInformation />
    </VerticalPaginationWrapper>
  );
};

const mapStateToProps = state => ({
  applicationInfo: appConfigSelectors.getApplicationInfo(state)
});

export const ApplicationOverview = connect(mapStateToProps)(ApplicationOverviewComponent);
