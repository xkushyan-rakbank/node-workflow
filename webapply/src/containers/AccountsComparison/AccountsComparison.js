import React, { useState, useEffect, useCallback, useContext } from "react";
import { useLocation } from "react-router-dom";

import { VerticalPaginationContext } from "../../components/VerticalPagination";
import { accountTypes } from "./components/TableCompare/constants";
import { AccountsComparisonComponent } from "./components/AccountsComparison/AccountsComparison";
import { applicationOverviewRoutesMap, CONVENTIONAL, DEFAULT_REFERRAL_NAME } from "../../constants";
import { useTrackingHistory } from "../../utils/useTrackingHistory";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const AccountsComparisonContainer = ({
  servicePricingGuideUrl,
  setProspectLead,
  setRoCode
}) => {
  let query = useQuery();

  const pushHistory = useTrackingHistory();
  const queryParams = useLocation().search;

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
    url => {
      if (queryParams) {
        pushHistory(url + queryParams);
      } else {
        pushHistory(url);
      }
    },
    [pushHistory]
  );

  const handleSetAccountType = useCallback(
    accountType => {
      setSelectedAccount(accountType);
      goto(applicationOverviewRoutesMap[accountType][CONVENTIONAL]);
    },
    [setSelectedAccount]
  );

  return (
    <AccountsComparisonComponent
      handleSetAccountType={handleSetAccountType}
      selectedAccount={selectedAccount}
      servicePricingGuideUrl={servicePricingGuideUrl}
    />
  );
};
