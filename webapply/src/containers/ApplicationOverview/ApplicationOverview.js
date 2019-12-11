import React from "react";
import { connect } from "react-redux";

import TwoSteps from "./TwoSteps";

import PreliminaryInformation from "./PreliminaryInformation";
import VerticalPaginationWrapper from "../../components/VerticalPaginationWrapper";
import * as appConfigSelectors from "../../store/selectors/appConfig";

const ApplicationOverview = ({ applicationInfo }) => {
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

export default connect(mapStateToProps)(ApplicationOverview);
