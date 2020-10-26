import React, { useState, useEffect, useCallback, useContext } from "react";
import { useLocation } from "react-router-dom";

import { VerticalPaginationContext } from "../../components/VerticalPagination";
import { accountTypes } from "./components/TableCompare/constants";
import { useLayoutParams, useLogoType } from "../FormLayout";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { AccountsComparisonComponent } from "./components/AccountsComparison/AccountsComparison";
import { LOGO_STANDART } from "../../components/Header/constants";
import { DEFAULT_REFERRAL_NAME } from "../../constants";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
 
export const AccountsComparisonContainer = ({ servicePricingGuideUrl, setProspectLead }) => {
  let query = useQuery();
  useEffect(() => {
    let referralName = query.get("product-name");
    if (!referralName) referralName = DEFAULT_REFERRAL_NAME;
    const leadInfo = { productName: referralName };
    setProspectLead(leadInfo);
  }, []);

  const { setCurrentSection, currentSectionIndex } = useContext(VerticalPaginationContext);
  useFormNavigation([true, false, [], !!currentSectionIndex]);
  useLayoutParams(false, false, true);
  useLogoType(LOGO_STANDART);

  const [selectedAccount, setSelectedAccount] = useState(accountTypes.starter.name);

  const handleSetAccountType = useCallback(
    accountType => {
      setSelectedAccount(accountType);
      setCurrentSection(2);
    },
    [setSelectedAccount, setCurrentSection]
  );

  return (
    <AccountsComparisonComponent
      setCurrentSection={setCurrentSection}
      handleSetAccountType={handleSetAccountType}
      selectedAccount={selectedAccount}
      servicePricingGuideUrl={servicePricingGuideUrl}
    />
  );
};
