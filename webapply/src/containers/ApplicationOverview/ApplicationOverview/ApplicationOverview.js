import React from "react";

import { TwoSteps } from "../components/TwoSteps";
import { PreliminaryInformation } from "../components/PreliminaryInformation";
import VerticalPaginationWrapper from "../../../components/VerticalPaginationWrapper";

export const ApplicationOverviewComponent = ({ applicationInfo = {} }) => {
  return (
    <VerticalPaginationWrapper>
      <TwoSteps
        accountType={applicationInfo.accountType}
        islamicBanking={applicationInfo.islamicBanking}
        withHeader
      />
      <PreliminaryInformation />
    </VerticalPaginationWrapper>
  );
};
