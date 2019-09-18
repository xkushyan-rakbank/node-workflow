import React from "react";
import { withStyles } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import SectionTitleWithInfo from "../../components/SectionTitleWithInfo";
import HorizontalIconCardsContainer from "../../components/HorizontalIconCards/HorizontalIconCardsContainer";
import HorizontalIconCardItem from "../../components/HorizontalIconCards/HorizontalIconCardItem";

const style = {
  indent: {
    marginBottom: "80px",
    "@media only screen and (max-width: 1300px)": {
      marginBottom: "0"
    }
  },
  notification: {
    width: "100%",
    paddingTop: "20px",
    fontSize: "12px",
    textAlign: "center",
    color: "#888888",
    "@media only screen and (max-width: 1300px)": {
      paddingTop: "10px"
    }
  },
  icon: {
    fontSize: "50px",
    color: "green"
  }
};

const AccountBenefits = ({ classes }) => {
  return (
    <>
      <div className={classes.indent}>
        <SectionTitleWithInfo title="An unmatched set of benefits, for an unmatched price" />
      </div>
      <HorizontalIconCardsContainer>
        <HorizontalIconCardItem
          minWidth="260px"
          text="Zero minimum monthly average credit balance"
        >
          <DoneIcon className={classes.icon} />
        </HorizontalIconCardItem>
        <HorizontalIconCardItem
          minWidth="260px"
          text="No ledger/ fall back fee"
        >
          <DoneIcon className={classes.icon} />
        </HorizontalIconCardItem>
        <HorizontalIconCardItem
          minWidth="260px"
          text="Available in AED, USD, EUR, GBP"
        >
          <DoneIcon className={classes.icon} />
        </HorizontalIconCardItem>
        <HorizontalIconCardItem
          minWidth="260px"
          text="Attractive Foreign Exchange and Trade Finance rates"
        >
          <DoneIcon className={classes.icon} />
        </HorizontalIconCardItem>
        <HorizontalIconCardItem
          minWidth="260px"
          text="Competitive rate of interest on Fixed Deposits"
        >
          <DoneIcon className={classes.icon} />
        </HorizontalIconCardItem>
        <HorizontalIconCardItem
          minWidth="260px"
          text="Earn attractive interest"
        >
          <DoneIcon className={classes.icon} />
        </HorizontalIconCardItem>
        <div className={classes.notification}>
          *Companies older than 12 months are not eligible for the RAKstarter
          account
        </div>
      </HorizontalIconCardsContainer>
    </>
  );
};

export default withStyles(style)(AccountBenefits);
