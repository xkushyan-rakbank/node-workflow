import React from "react";

import { Icon, ICONS } from "../../../../components/Icons";

import { useStyles } from "./styled";

export const CompanyCard = ({
  className = "",
  companyName,
  icon = ICONS.brief,
  controls,
  children
}) => {
  const classes = useStyles();

  return (
    <div className={className}>
      <header className={classes.header}>
        <div className={classes.companyIconWrap}>
          <Icon name={icon} alt="companyIconSvg" className={classes.companyIcon} />
        </div>
        <div className={classes.contentBox}>
          <h3 className={classes.label}>{companyName}</h3>
        </div>
        <div className={classes.controlsBox}>{controls}</div>
      </header>
      {children}
    </div>
  );
};
