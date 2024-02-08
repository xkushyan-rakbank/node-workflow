import React from "react";
import { useLocation } from "react-router-dom";
import cx from "classnames";

import { detailedAccountRoutes } from "../../constants";

import { useStyles } from "./styled";

import { ReactComponent as ArrowDown } from "../../assets/icons/arrowDown.svg";

export const IslamicSwitcher = ({ children, className, isSwitcherShow, toggleSwitcherShow }) => {
  const classes = useStyles({ isSwitcherShow });
  const { pathname } = useLocation();

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
