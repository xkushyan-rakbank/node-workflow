import React from "react";
import TwoSteps from "./TwoSteps";
import { connect } from "react-redux";

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
