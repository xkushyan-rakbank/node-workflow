import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { updateProspect } from "../store/actions/appConfig";
import { accountTypeURIs } from "../constants";

export const useAccountTypeByPathname = () => {
  const { accountType: accountRoute } = useParams();
  const dispatch = useDispatch();
  const isIslamicBanking = accountTypeURIs[accountRoute].isIslamicBanking;
  const accountType = accountTypeURIs[accountRoute].accountType;

  useEffect(() => {
    dispatch(
      updateProspect({
        "prospect.applicationInfo.islamicBanking": isIslamicBanking,
        "prospect.applicationInfo.accountType": accountType
      })
    );
  }, [dispatch, accountType, isIslamicBanking]);

  return {
    accountType,
    isIslamicBanking
  };
};
