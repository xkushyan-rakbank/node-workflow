import React, { useState, useEffect, useCallback, useContext } from "react";
import { useLocation } from "react-router-dom";

import { VerticalPaginationContext } from "../../components/VerticalPagination";
import { accountTypes } from "./components/TableCompare/constants";
import { AccountsComparisonComponent } from "./components/AccountsComparison/AccountsComparison";
import {
  accountNames,
  applicationOverviewRoutesMap,
  CONVENTIONAL,
  DEFAULT_REFERRAL_NAME
} from "../../constants";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import { ConfirmDialog } from "../../components/Modals";
import { RAK_STARTER_CONFIRM_MESSAGE } from "./constants";

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
  const [isDisplayConfirmDialog, setIsDisplayConfirmDialog] = useState(false);

  const goto = useCallback(
    accountType => {
      if (queryParams) {
        pushHistory(applicationOverviewRoutesMap[accountType][CONVENTIONAL] + queryParams);
      } else {
        pushHistory(applicationOverviewRoutesMap[accountType][CONVENTIONAL]);
      }
    },
    [pushHistory]
  );

  const handleSetAccountType = useCallback(
    accountType => {
      if (accountType === accountNames.starter) {
        setIsDisplayConfirmDialog(true);
      } else {
        goto(accountType);
      }
      setSelectedAccount(accountType);
    },
    [setSelectedAccount]
  );

  const closeDialogHandler = useCallback(() => {
    setIsDisplayConfirmDialog(false);
  }, [setIsDisplayConfirmDialog]);

  const confirmHandler = useCallback(() => {
    closeDialogHandler();
    goto(accountNames.starter);
  }, [closeDialogHandler, goto]);

  return (
    <>
      <AccountsComparisonComponent
        handleSetAccountType={handleSetAccountType}
        selectedAccount={selectedAccount}
        servicePricingGuideUrl={servicePricingGuideUrl}
      />
      <ConfirmDialog
        title={null}
        isOpen={isDisplayConfirmDialog}
        handleConfirm={confirmHandler}
        handleReject={closeDialogHandler}
        handleClose={closeDialogHandler}
        message={RAK_STARTER_CONFIRM_MESSAGE}
        cancelLabel="No"
        confirmLabel="Yes"
        divider={false}
      />
    </>
  );
};