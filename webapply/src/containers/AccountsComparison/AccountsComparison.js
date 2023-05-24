import React, { useState, useEffect, useCallback, useContext } from "react";
import { useLocation } from "react-router-dom";

import { VerticalPaginationContext } from "../../components/VerticalPagination";
import { accountTypes } from "./components/TableCompare/constants";
import { useLayoutParams, useLogoType } from "../FormLayout";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { AccountsComparisonComponent } from "./components/AccountsComparison/AccountsComparison";
import { LOGO_STANDART } from "../../components/Header/constants";
import { DEFAULT_REFERRAL_NAME, applicationOverviewRoutesMap, CONVENTIONAL } from "../../constants";
import { useTrackingHistory } from "../../utils/useTrackingHistory";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const AccountsComparisonContainer = ({
  servicePricingGuideUrl,
  setProspectLead,
  setRoCode
}) => {
  const location = useLocation();
  let query = useQuery();
  const queryParams = useLocation().search;
  const pushHistory = useTrackingHistory();
  useEffect(() => {
    let referralName = query.get("product-name");
    if (!referralName) referralName = DEFAULT_REFERRAL_NAME;
    const leadInfo = { productName: referralName };
    setProspectLead(leadInfo);
    let roCode = query.get("rocode") ? query.get("rocode") : "";
    setRoCode(roCode);
  }, [query, setRoCode, setProspectLead]);

  useEffect(() => {
    const { state } = location;
    if (state != undefined && state.applicationOverviewFlow !== undefined) {
      setTimeout(() => {
        setCurrentSection(1);
      }, 500);
    }
  }, []);
  const { setCurrentSection, currentSectionIndex } = useContext(VerticalPaginationContext);
  useFormNavigation([true, false, [], !!currentSectionIndex]);
  useLayoutParams(false, false, true);
  useLogoType(LOGO_STANDART);

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
      setCurrentSection(2);
    },
    [setSelectedAccount, setCurrentSection]
  );

  const handleApply = useCallback(
    accountType => {
      setSelectedAccount(accountType);
      goto(applicationOverviewRoutesMap[accountType][CONVENTIONAL]);
    },
    [setSelectedAccount, false]
  );

  return (
    <AccountsComparisonComponent
      setCurrentSection={setCurrentSection}
      handleSetAccountType={handleSetAccountType}
      handleApply={handleApply}
      selectedAccount={selectedAccount}
      servicePricingGuideUrl={servicePricingGuideUrl}
    />
  );
};
