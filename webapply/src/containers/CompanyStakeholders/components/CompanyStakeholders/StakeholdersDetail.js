import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  stakeholderWrapper: {
    display: "flex",
    alignItems: "center"
  },
  nameInitialWrapper: {
    height: "54px",
    width: "54px",
    borderRadius: "50px",
    padding: "10px",
    background: "#FDE7E8",
    fontWeight: 400,
    fontSize: "24px",
    color: "#757575",
    textAlign: "center",
    lineHeight: "54px"
  },
  detailWrapper: {
    display: "flex",
    textAlign: "left",
    flexDirection: "column",
    marginLeft: "16px",
    "& h5": {
      fontSize: "20px",
      fontWeight: 500,
      lineHeight: "28px",
      textAlign: "left",
      color: "#1F1F1F",
      margin: 0
    },
    "& p": {
      fontSize: "14px",
      fontWeight: 400,
      color: "#757575",
      lineHeight: "20px",
      margin: 0,
      marginTop: "4px"
    }
  }
});
const StakeholdersDetail = ({ name, companyCategory }) => {
  const classes = useStyles();

  const initial = name.charAt(0).toUpperCase();
  const isSoleProprietor = (companyCategory === "1_SP" || companyCategory === "2_SPLL") && "(me)"

  return (
    <div className={classes.stakeholderWrapper}>
      <div className={classes.nameInitialWrapper}>{initial}</div>
      <div className={classes.detailWrapper}>
        <h5>{name}&nbsp;{isSoleProprietor}</h5>
        <p>Stakeholder: 100%</p>
      </div>
    </div>
  );
};
export default StakeholdersDetail;
