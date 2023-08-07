import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as InformationIcon } from "../assets/icons/information.svg";

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
    fontWeight: "400",
    color: "#757575",
    marginTop: "10px",
    "& div": {
      display: "flex",
      alignItems: "center",
      whiteSpace: "pre-line"
    }
  },
  informationDisclaimer: {
    display: "flex",
    alignItems: "center",
    whiteSpace: "pre-line",
    marginRight: "auto",
    gap: "8px"
  }
});

export const FieldDescription = ({ title, fieldValueLength, fieldMaxLength, showTitleIcon }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      {title && (
        <div className={classes.informationDisclaimer}>
          <InformationIcon />
          {title}
        </div>
      )}
      {fieldMaxLength && (
        <div>
          {fieldValueLength}&nbsp;/&nbsp;{fieldMaxLength}
        </div>
      )}
    </div>
  );
};
