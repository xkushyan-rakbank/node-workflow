import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { getIsIslamicBanking, getAccountType } from "../../store/selectors/appConfig";
import { accountNames } from "../../constants";
import {
  LOGO_ELITE_ISLAMIC,
  LOGO_ELITE,
  LOGO_ISLAMIC,
  LOGO_STANDART
} from "../../components/Header/constants";

export const LogoTypeContext = React.createContext({});

let setValues;

const getDefaultLogoType = (isIslamicBanking, accountType) => {
  if (accountType === accountNames.elite && isIslamicBanking) {
    return LOGO_ELITE_ISLAMIC;
  }
  if (accountType === accountNames.elite) {
    return LOGO_ELITE;
  }
  if (isIslamicBanking) {
    return LOGO_ISLAMIC;
  }
  return LOGO_STANDART;
};

export const LogoTypeProvider = ({ children }) => {
  const { pathname } = useLocation();
  const isIslamicBanking = useSelector(getIsIslamicBanking);
  const accountType = useSelector(getAccountType);
  const [contextValue, setContextValues] = useState(null);
  setValues = setContextValues;

  useEffect(() => {
    contextValue && setContextValues(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <LogoTypeContext.Provider
      value={contextValue || getDefaultLogoType(isIslamicBanking, accountType)}
    >
      {children}
    </LogoTypeContext.Provider>
  );
};

export const useLogoType = logo => {
  useEffect(() => {
    setValues && setValues(logo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logo]);
};
