import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { ApplicationOverviewComponent } from "./components/ApplicationOverviewComponent";
import { removeProspectId, setProspectLead } from "../../store/actions/appConfig";
import { useAccountTypeByPathname } from "../../utils/useAccountTypeByPathname";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";

export const ApplicationOverview = () => {
  useAccountTypeByPathname();
  useFormNavigation([true, false]);
  const dispatch = useDispatch();

  const query = new URLSearchParams(useLocation().search);
  useEffect(() => {
    let referralName = "";
    referralName = query.get("product-name");
    const leadInfo = { productName: referralName };
    dispatch(setProspectLead(leadInfo));
  }, []);

  useEffect(() => {
    dispatch(removeProspectId());
  }, [dispatch]);

  return <ApplicationOverviewComponent />;
};
