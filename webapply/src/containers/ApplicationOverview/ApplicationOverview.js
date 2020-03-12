import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { ApplicationOverviewComponent } from "./components/ApplicationOverviewComponent";
import { removeProspectId } from "../../store/actions/appConfig";
import { useAccountTypeByPathname } from "../../utils/useAccountTypeByPathname";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";

export const ApplicationOverview = () => {
  useAccountTypeByPathname();
  useFormNavigation([true, false]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(removeProspectId());
  }, [dispatch]);

  return <ApplicationOverviewComponent />;
};
