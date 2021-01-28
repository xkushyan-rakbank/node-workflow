import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { ApplicationOverviewComponent } from "./components/ApplicationOverviewComponent";
import { removeProspectId, setProspectLead, setRoCode } from "../../store/actions/appConfig";
import { useAccountTypeByPathname } from "../../utils/useAccountTypeByPathname";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { DEFAULT_REFERRAL_NAME } from "../../constants";

export const ApplicationOverview = () => {
  useAccountTypeByPathname();
  useFormNavigation([true, false]);
  const dispatch = useDispatch();

  const query = new URLSearchParams(useLocation().search);
  useEffect(() => {
    let referralName = query.get("product-name");
    if (!referralName) referralName = DEFAULT_REFERRAL_NAME;
    const leadInfo = { productName: referralName };
    dispatch(setProspectLead(leadInfo));
    let roCode = query.get("rocode") ? query.get("rocode") : "";
    dispatch(setRoCode(roCode));
  }, [dispatch, query]);

  useEffect(() => {
    dispatch(removeProspectId());
  }, [dispatch]);

  return <ApplicationOverviewComponent />;
};
