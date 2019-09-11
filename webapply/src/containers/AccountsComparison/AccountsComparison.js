import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AccountsComparisonContainer from "./AccountsComparisonContainer";
import AccountCardContainer from "./AccountCardContainer";

const style = {
  container: {
    display: "flex",
    flexDirection: "column"
  }
};

const AccountsComparison = ({ classes }) => (
  <div className={classes.container}>
    <AccountsComparisonContainer>
      <AccountCardContainer />
    </AccountsComparisonContainer>
    <AccountsComparisonContainer>content</AccountsComparisonContainer>
  </div>
);

export default withStyles(style)(AccountsComparison);
