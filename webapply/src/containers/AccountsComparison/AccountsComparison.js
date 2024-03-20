import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { accountTypes } from "./components/TableCompare/constants";
import { AccountsComparisonComponent } from "./components/AccountsComparison/AccountsComparison";
import {
  applicationOverviewRoutesMap,
  CONVENTIONAL,
  DEFAULT_REFERRAL_NAME,
  ISLAMIC
} from "../../constants";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import { resetProspect } from "../../store/actions/appConfig";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const AccountsComparisonContainer = ({
  servicePricingGuideUrl,
  setProspectLead,
  setRoCode
}) => {
  let query = useQuery();

  const dispatch = useDispatch();
  const pushHistory = useTrackingHistory();
  const searchParam = useLocation().search;
  const queryHash = useLocation().hash;

  const queryParams = queryHash ? `?${queryHash.split("?")[1]}` : searchParam;

  useEffect(() => {
    dispatch(resetProspect());
  }, []);

  useEffect(() => {
    let referralName = query.get("product-name");
    if (!referralName) referralName = DEFAULT_REFERRAL_NAME;
    const leadInfo = { productName: referralName };
    setProspectLead(leadInfo);
    let roCode = query.get("rocode") ? query.get("rocode") : "";
    setRoCode(roCode);
  }, [query, setRoCode, setProspectLead]);

  const [selectedAccount, setSelectedAccount] = useState(accountTypes.starter.name);

  const goto = useCallback(
    (accountType, isIslamicVal) => {
      if (queryParams) {
        isIslamicVal
          ? pushHistory(applicationOverviewRoutesMap[accountType][ISLAMIC] + queryParams)
          : pushHistory(applicationOverviewRoutesMap[accountType][CONVENTIONAL] + queryParams);
      } else {
        isIslamicVal
          ? pushHistory(applicationOverviewRoutesMap[accountType][ISLAMIC])
          : pushHistory(applicationOverviewRoutesMap[accountType][CONVENTIONAL]);
      }
    },
    [pushHistory]
  );

  const handleSetAccountType = useCallback(
    (accountType, isIslamicVal) => {
      goto(accountType, isIslamicVal);
      setSelectedAccount(accountType);
    },
    [setSelectedAccount]
  );

  return (
    <>
      <AccountsComparisonComponent
        handleSetAccountType={handleSetAccountType}
        selectedAccount={selectedAccount}
        servicePricingGuideUrl={servicePricingGuideUrl}
      />
    </>
  );
};
