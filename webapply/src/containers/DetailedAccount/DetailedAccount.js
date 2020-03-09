import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";

import { VerticalPagination } from "../../components/VerticalPagination";
import IslamicBankingSwitcher from "../../components/IslamicBankingSwitcher/IslamicBankingSwitcher";
import { AccountBenefits } from "./AccountBenefits";
import { AccountingSoftware } from "./AccountingSoftware";

import { getAccountType, getIsIslamicBanking } from "../../store/selectors/appConfig";
import { getVideoByAccountType } from "../../utils/getVideoByAccountType";
import { FormNavigationContext } from "../../components/FormNavigation/FormNavigationProvider/FormNavigationProvider";

export const DetailedAccount = () => {
  const isIslamicBaning = useSelector(getIsIslamicBanking);
  const accountType = useSelector(getAccountType);
  const { setChatVisibility, setFormStepper } = useContext(FormNavigationContext);

  useEffect(() => {
    setChatVisibility(false);
    setFormStepper(false);
  }, [setFormStepper, setChatVisibility]);

  return (
    <>
      <div className="hide-on-mobile">
        <IslamicBankingSwitcher />
      </div>
      <VerticalPagination video={getVideoByAccountType(accountType, isIslamicBaning)}>
        <AccountBenefits />
        <AccountingSoftware />
      </VerticalPagination>
    </>
  );
};
