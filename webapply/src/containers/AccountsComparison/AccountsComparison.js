import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AccountsComparisonContainer from "./AccountsComparisonContainer";

const style = {
  container: {
    display: "flex",
    flexDirection: "column"
  }
};

const AccountsComparison = ({ classes }) => (
  <div className={classes.container}>
    <AccountsComparisonContainer />
  </div>
);

export default withStyles(style)(AccountsComparison);
