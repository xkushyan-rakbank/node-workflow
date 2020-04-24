import React, { useContext, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { VerticalPaginationContext } from "../../components/VerticalPagination";
import { DetailedAccountComponent } from "./components/DetailedAccount";
import { useAccountTypeByPathname } from "../../utils/useAccountTypeByPathname";
import { useLayoutParams } from "../FormLayout";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { getAccountType } from "../../store/selectors/appConfig";
import { sendGoogleAnalyticsMetrics } from "../../store/actions/googleAnalytics";
import { GA_EVENTS } from "../../utils/ga";

export const DetailedAccount = () => {
  const dispatch = useDispatch();
  const selectedAccountType = useSelector(getAccountType);
  const { accountType, isIslamicBanking } = useAccountTypeByPathname();
  const { setCurrentSection } = useContext(VerticalPaginationContext);
  useFormNavigation([true, false]);
  useLayoutParams(false, false, true);

  const handleClickonReadMoreBtn = useCallback(() => {
    dispatch(sendGoogleAnalyticsMetrics(GA_EVENTS.PRODUCT_REVIEW_PAGE));
    setCurrentSection(1);
  }, [setCurrentSection, dispatch]);

  return (
    <DetailedAccountComponent
      accountType={accountType}
      isIslamicBanking={isIslamicBanking}
      setCurrentSection={setCurrentSection}
      selectedAccountType={selectedAccountType}
      handleClickonReadMoreBtn={handleClickonReadMoreBtn}
    />
  );
};
