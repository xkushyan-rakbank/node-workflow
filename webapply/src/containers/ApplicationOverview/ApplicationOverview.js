import React from "react";
import TwoSteps from "./TwoSteps";
import PreliminaryInformation from "./PreliminaryInformation";
import VerticalPaginationWrapper from "../../components/VerticalPaginationWrapper";

const ApplicationOverview = () => {
  return (
    <VerticalPaginationWrapper>
      <TwoSteps />
      <PreliminaryInformation />
    </VerticalPaginationWrapper>
  );
};

export default ApplicationOverview;
