import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { theme } from "../../theme";

const useStyles = makeStyles(() => ({
  iconsWrapper: {
    width: "auto",
    paddingTop: "24px",
    alignItems: "center",
    gap: "24px",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      flexWrap: "wrap",
      margin: "20px -10px",
      paddingTop: "unset",
      alignItems: "unset",
      gap: "unset",
      flexDirection: "row",
    },
  },
}));

export const IconCardsContainer = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.iconsWrapper}>{children}</div>;
};
