import React, { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import cx from "classnames";

import {
  CONVENTIONAL,
  detailedAccountRoutes,
  detailedAccountRoutesMap,
  ISLAMIC
} from "../../constants";
import { getAccountType, getIsIslamicBanking } from "../../store/selectors/appConfig";
import { IslamicSwitcherButtons } from "./IslamicSwitcherButtons/IslamicSwitcherButtons";
import { useTrackingHistory } from "../../utils/useTrackingHistory";

import { useStyles } from "./styled";

import { ReactComponent as ArrowDown } from "../../assets/icons/arrowDown.svg";

export const IslamicSwitcher = ({ children, className, isSwitcherShow, toggleSwitcherShow }) => {
  const classes = useStyles({ isSwitcherShow });

  const isIslamicBanking = useSelector(getIsIslamicBanking);
  const accountType = useSelector(getAccountType);

  const pushHistory = useTrackingHistory();
  const { pathname } = useLocation();
  const queryParams = useLocation().search;

  const setIsIslamicBanking = useCallback(
    islamicBanking => {
      pushHistory(
        detailedAccountRoutesMap[accountType][islamicBanking ? ISLAMIC : CONVENTIONAL] + queryParams
      );
    },
    [pushHistory, accountType]
  );

  if (!detailedAccountRoutes.includes(pathname)) return null;

  return (
    <>
      <button onClick={toggleSwitcherShow} className={classes.buttonToggler}>
        <ArrowDown className={classes.arrowDownIcon} />
      </button>
      <div className={cx(className, classes.switcherWrapper)}>
        <div className={classes.children}>{children}</div>
      </div>
    </>
  );
};
