import React from "react";
import { useLocation } from "react-router-dom";
import cx from "classnames";

import { ReactComponent as ArrowDown } from "../../assets/icons/arrowDown.svg";
import { detailedAccountRoutes } from "../../constants";
import { IslamicSwitcher } from "./IslamicSwitcher/IslamicSwitcher";
import { useStyles } from "./styled";

export const IslamicSwitcherWrapper = ({
  children,
  className,
  isSwitcherShow,
  toggleSwitcherShow
}) => {
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
        <IslamicSwitcher />
      </div>
    </>
  );
};
