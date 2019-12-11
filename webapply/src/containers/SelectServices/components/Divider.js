import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  divider: {
    height: "1px",
    backgroundColor: "#e6e6e680",
    margin: "30px auto 10px"
  }
});

export const Divider = ({ classes: extendedClasses }) => {
  const classes = useStyles({ classes: extendedClasses });
  return <div className={classes.divider} />;
};
