import React from "react";
import { makeStyles } from "@material-ui/core/styles";

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
  }
});

export const FieldDescription = ({ title, fieldValueLength, fieldMaxLength }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div>{title}</div>
      {fieldMaxLength && (
        <div>
          {fieldValueLength}&nbsp;/&nbsp;{fieldMaxLength}
        </div>
      )}
    </div>
  );
};
