import React, { useState } from "react";
import cx from "classnames";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  stakeholderWrapper: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "30px",
    },
  },
  nameInitialWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "54px",
    width: "54px",
    minWidth: "54px",
    borderRadius: "50px",
    padding: "10px",
    background: "#FDE7E8",
    fontWeight: 400,
    fontSize: "24px",
    color: "#757575",
    textAlign: "center",
    lineHeight: "54px",
    [theme.breakpoints.down("md")]: {
      height: "32px",
      width: "32px",
      minWidth: "32px",
      lineHeight: "unset",
    },
  },
  detailWrapper: {
    display: "flex",
    textAlign: "left",
    flexDirection: "column",
    marginLeft: "16px",
    "& h5": {
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: "24px",
      textAlign: "left",
      color: "#1F1F1F",
      margin: 0,
      [theme.breakpoints.up("sm")]: {
        fontSize: "20px",
        lineHeight: "28px",
      },
    },
    "& p": {
      fontSize: "14px",
      fontWeight: 400,
      color: "#757575",
      lineHeight: "20px",
      margin: 0,
      marginTop: "4px",
    },
  },
}));
const StakeholdersDetail = ({
  className,
  name,
  companyCategory,
  isStakeholder = true,
  referenceNumber = false
}) => {
  const classes = useStyles();

  const initial = name?.charAt(0)?.toUpperCase();
  const isSoleProprietor = (companyCategory === "SOLE" || companyCategory === "SLLC") && "(me)";

  return (
    <div className={cx(classes.stakeholderWrapper, className)}>
      <div className={classes.nameInitialWrapper}>{initial}</div>
      <div className={classes.detailWrapper}>
        <h5>
          {name}&nbsp;{isSoleProprietor}
        </h5>
        {isStakeholder && <p>Stakeholder: 100%</p>}
        {referenceNumber && <p>{referenceNumber}</p>}
      </div>
    </div>
  );
};
export default StakeholdersDetail;
