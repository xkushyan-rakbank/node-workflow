import React from "react";

import { TwoSteps } from "./components/TwoSteps";

import { PreliminaryInformation } from "./components/PreliminaryInformation";
import VerticalPaginationWrapper from "../../components/VerticalPaginationWrapper";

export const ApplicationOverview = () => {
  return (
    <VerticalPaginationWrapper>
      <TwoSteps withHeader />
      <PreliminaryInformation />
    </VerticalPaginationWrapper>
  );
};
