import React, { useContext, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { VerticalPaginationContext } from "../../components/VerticalPagination";
import { DetailedAccountComponent } from "./components/DetailedAccount";
import { useAccountTypeByPathname } from "../../utils/useAccountTypeByPathname";
import { useLayoutParams } from "../FormLayout";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { getAccountType } from "../../store/selectors/appConfig";
import { sendGoogleAnalyticsMetrics } from "../../store/actions/googleAnalytics";
import { GA_EVENTS } from "../../utils/ga";
import { setProspectLead } from "../../store/actions/appConfig";
import { DEFAULT_REFERRAL_NAME } from "../../constants";

export const DetailedAccount = () => {
  const dispatch = useDispatch();

  const query = new URLSearchParams(useLocation().search);
  useEffect(() => {
    let referralName = query.get("product-name");
    if (!referralName) referralName = DEFAULT_REFERRAL_NAME;
    const leadInfo = { productName: referralName };
    dispatch(setProspectLead(leadInfo));
  }, [dispatch, query]);

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
