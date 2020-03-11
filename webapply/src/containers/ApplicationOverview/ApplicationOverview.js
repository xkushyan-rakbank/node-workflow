import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { ApplicationOverviewComponent } from "./components/ApplicationOverviewComponent";
import { removeProspectId } from "../../store/actions/appConfig";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";

export const ApplicationOverview = () => {
  useFormNavigation([true, false]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(removeProspectId());
  }, [dispatch]);

  return <ApplicationOverviewComponent />;
};
