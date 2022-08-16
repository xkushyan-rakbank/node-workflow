import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getOrgKYCDetails,
  getIsIslamicBanking,
  getDatalist
} from "../../store/selectors/appConfig";
import { updateProspect } from "../../store/actions/appConfig";

import { Industry as IndustryStep } from "./components/Industry";

export const Industry = props => {
  const orgDetails = useSelector(getOrgKYCDetails) || {};
  const industries = orgDetails.industryMultiSelect || [];
  const isIslamicBanking = useSelector(getIsIslamicBanking);
  const datalist = useSelector(getDatalist);
  const dispatch = useDispatch();

  const updateIndustry = useCallback(
    values =>
      dispatch(
        updateProspect({
          "prospect.orgKYCDetails.industryMultiSelect[0]": values
        })
      ),
    [dispatch]
  );

  const datalistId = isIslamicBanking ? "islamicIndustry" : "industry";

  return (
    <IndustryStep
      industries={industries}
      datalistId={datalistId}
      datalist={datalist}
      updateIndustry={updateIndustry}
      {...props}
    />
  );
};
