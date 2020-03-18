import React from "react";
import { TwoSteps } from "./TwoSteps";
import { PreliminaryInformation } from "./PreliminaryInformation";

export const ApplicationOverviewComponent = () => (
  <>
    <TwoSteps withHeader />
    <PreliminaryInformation />
  </>
);
