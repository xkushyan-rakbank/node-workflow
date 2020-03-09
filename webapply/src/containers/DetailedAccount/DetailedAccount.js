import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { VerticalPagination } from "../../components/VerticalPagination";
import IslamicBankingSwitcher from "../../components/IslamicBankingSwitcher/IslamicBankingSwitcher";
import { AccountBenefits } from "./AccountBenefits";
import { AccountingSoftware } from "./AccountingSoftware";

import { getVideoByAccountType } from "../../utils/getVideoByAccountType";
import { updateProspect } from "../../store/actions/appConfig";
import { accountTypeURIs } from "../../constants";
import { FormNavigationContext } from "../../components/FormNavigation/FormNavigationProvider/FormNavigationProvider";

export const DetailedAccount = () => {
  const { accountType: accountRoute } = useParams();
  const dispatch = useDispatch();
  const isIslamicBanking = accountTypeURIs[accountRoute].isIslamicBanking;
  const accountType = accountTypeURIs[accountRoute].accountType;

  const { setChatVisibility, setFormStepper } = useContext(FormNavigationContext);

  useEffect(() => {
    setChatVisibility(false);
    setFormStepper(false);
  }, [setFormStepper, setChatVisibility]);

  useEffect(() => {
    dispatch(
      updateProspect({
        "prospect.applicationInfo.islamicBanking": isIslamicBanking,
        "prospect.applicationInfo.accountType": accountType
      })
    );
  }, [accountType, isIslamicBanking]);

  return (
    <>
      <div className="hide-on-mobile">
        <IslamicBankingSwitcher />
      </div>
      <VerticalPagination video={getVideoByAccountType(accountType, isIslamicBanking)}>
        <AccountBenefits />
        <AccountingSoftware />
      </VerticalPagination>
    </>
  );
};
