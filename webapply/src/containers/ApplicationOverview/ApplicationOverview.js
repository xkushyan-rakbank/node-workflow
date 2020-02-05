import React from "react";

import { TwoSteps } from "./components/TwoSteps";

import { PreliminaryInformation } from "./components/PreliminaryInformation";
import { VerticalPagination } from "../../components/VerticalPagination";

export const ApplicationOverview = () => {
  return (
    <VerticalPagination>
      <TwoSteps withHeader />
      <PreliminaryInformation />
    </VerticalPagination>
  );
};
