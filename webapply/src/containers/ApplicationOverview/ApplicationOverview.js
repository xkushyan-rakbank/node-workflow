import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { TwoSteps } from "./components/TwoSteps";
import { PreliminaryInformation } from "./components/PreliminaryInformation";

import { VerticalPagination } from "../../components/VerticalPagination";
import { removeProspectId } from "../../store/actions/appConfig";

export const ApplicationOverview = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(removeProspectId());
  }, []);

  return (
    <VerticalPagination>
      <TwoSteps withHeader />
      <PreliminaryInformation />
    </VerticalPagination>
  );
};
