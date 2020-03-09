import React from "react";
import { TwoSteps } from "./TwoSteps";
import { PreliminaryInformation } from "./PreliminaryInformation";

import { VerticalPagination } from "../../../components/VerticalPagination";

export const ApplicationOverviewComponent = () => (
  <VerticalPagination>
    <TwoSteps withHeader />
    <PreliminaryInformation />
  </VerticalPagination>
);
