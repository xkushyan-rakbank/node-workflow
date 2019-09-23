import React from "react";
import { withStyles } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import earn from "../../assets/icons/earn.svg";
import deposit from "../../assets/icons/deposit.svg";
import availability from "../../assets/icons/availability.svg";
import exchange from "../../assets/icons/exchange.svg";
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
        <SectionTitleWithInfo title="The tools you need for the scale you want" />
      </div>
      <HorizontalIconCardsContainer>
        <HorizontalIconCardItem minWidth="260px" text="A low minimum balance">
          <DoneIcon className={classes.icon} />
        </HorizontalIconCardItem>
        <HorizontalIconCardItem
          minWidth="260px"
          text="Comprehensive account statements for all your transactions"
        >
          <DoneIcon className={classes.icon} />
        </HorizontalIconCardItem>
        <HorizontalIconCardItem
          minWidth="260px"
          text="Available in AED, USD, EUR, GBP"
        >
          <img src={availability} alt="availability" />
        </HorizontalIconCardItem>
        <HorizontalIconCardItem
          minWidth="260px"
          text="Exclusive Foreign Exchange and Trade Finance rates"
        >
          <img src={exchange} alt="exchange" />
        </HorizontalIconCardItem>
        <HorizontalIconCardItem
          minWidth="260px"
          text="Exclusive rates of interest on Fixed Deposits"
        >
          <img src={deposit} alt="deposit" />
        </HorizontalIconCardItem>
        <HorizontalIconCardItem
          minWidth="260px"
          text="Earn preferential interest"
        >
          <img src={earn} alt="earn" />
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
