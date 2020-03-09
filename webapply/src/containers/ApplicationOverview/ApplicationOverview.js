import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { ApplicationOverviewComponent } from "./components/ApplicationOverviewComponent";
import { removeProspectId } from "../../store/actions/appConfig";

export const ApplicationOverview = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(removeProspectId());
  }, [dispatch]);

  return <ApplicationOverviewComponent />;
};
