import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { accountTypes } from "./components/TableCompare/constants";
import { AccountsComparisonComponent } from "./components/AccountsComparison/AccountsComparison";
import { applicationOverviewRoutesMap, CONVENTIONAL, DEFAULT_REFERRAL_NAME } from "../../constants";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import { logout } from "../../store/actions/loginForm";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const AccountsComparisonContainer = ({
  servicePricingGuideUrl,
  setProspectLead,
  setRoCode,
}) => {
  let query = useQuery();

  const dispatch = useDispatch();
  const pushHistory = useTrackingHistory();
  const queryParams = useLocation().search;

  useEffect(() => {
    dispatch(logout());
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
    (accountType) => {
      if (queryParams) {
        pushHistory(applicationOverviewRoutesMap[accountType][CONVENTIONAL] + queryParams);
      } else {
        pushHistory(applicationOverviewRoutesMap[accountType][CONVENTIONAL]);
      }
    },
    [pushHistory]
  );

  const handleSetAccountType = useCallback(
    (accountType) => {
      goto(accountType);
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