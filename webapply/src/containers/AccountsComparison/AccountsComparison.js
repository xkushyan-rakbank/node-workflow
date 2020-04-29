import React, { useState, useCallback, useContext } from "react";

import { VerticalPaginationContext } from "../../components/VerticalPagination";
import { accountTypes } from "./components/TableCompare/constants";
import { useLayoutParams, useLogoType } from "../FormLayout";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { AccountsComparisonComponent } from "./components/AccountsComparison/AccountsComparison";
import { LOGO_STANDART } from "../../components/Header/constants";

export const AccountsComparisonContainer = ({ servicePricingGuideUrl }) => {
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
