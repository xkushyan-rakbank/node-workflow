import React from "react";
import { withStyles } from "@material-ui/core/styles";
import SectionTitleWithInfo from "../../components/SectionTitleWithInfo";
import AccountCardContainer from "./AccountCardContainer";
import InfoNote from "../../components/InfoNote";

const style = {
  container: {
    display: "inline-block",
    "& + &": {
      marginTop: "150px"
    }
  },
  cardsContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "40px"
  }
};

class AccountsComparisonContainer extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div className={classes.container}>
          <SectionTitleWithInfo
            title="One business account for every business stage"
            info="Wherever your business is, our accounts will meet you there"
          />
          <AccountCardContainer />
          <InfoNote text="Note: Companies older than 12 months are not eligible for the RAKstarter account" />
        </div>

        <div className={classes.container}>
          <SectionTitleWithInfo
            title="Compare the accounts"
            info="Our three business accounts, side by side"
          />
          <InfoNote text="Note: 5% VAT will be levied on all charges applicable to business customers as published on the Service & Price guide. For all other charges related to your accounts please visit www.rakbank.ae " />
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(style)(AccountsComparisonContainer);
