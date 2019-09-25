import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import manager from "../../assets/icons/manager.png";
import balance from "../../assets/icons/balance.png";
import availability from "../../assets/icons/availability.png";
import exchange from "../../assets/icons/exchange.png";
import transaction from "../../assets/icons/transaction.png";
import withdrawal from "../../assets/icons/withdrawal.png";
import processing from "../../assets/icons/processing.png";
import serviceCenter from "../../assets/icons/service-center.png";
import lounge from "../../assets/icons/lounge.svg";
import SectionTitleWithInfo from "../../components/SectionTitleWithInfo";
import HorizontalIconCardsContainer from "../../components/HorizontalIconCards/HorizontalIconCardsContainer";
import HorizontalIconCardItem from "../../components/HorizontalIconCards/HorizontalIconCardItem";
import * as appConfigSelectors from "../../store/selectors/appConfig";

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
    width: "64px",
    height: "64px",
    "@media only screen and (max-width: 1300px)": {
      width: "56px",
      height: "56px"
    }
  }
};

const AccountBenefits = ({ classes, accountType }) => {
  const getText = accountType => {
    switch (accountType) {
      case "RAKStarter":
        return "Unmatched benefits to make banking stress-free";
      case "Current Account":
        return "Unmatched benefits for an unmatched price";
      case "RAKelite":
        return "Unmatched privileges to take your business to the next level";
      default:
        return "";
    }
  };

  const text = getText(accountType);
  return (
    <>
      <div className={classes.indent}>
        <SectionTitleWithInfo title={text} />
      </div>
      {accountType === "RAKStarter" && (
        <HorizontalIconCardsContainer>
          <HorizontalIconCardItem text="No minimum balance required">
            <img className={classes.icon} src={balance} alt="balance" />
          </HorizontalIconCardItem>
          <HorizontalIconCardItem text="Available in AED, USD, EUR, GBP">
            <img
              className={classes.icon}
              src={availability}
              alt="availability"
            />
          </HorizontalIconCardItem>
          <HorizontalIconCardItem text="Preferential transaction fees through Digital Banking">
            <img className={classes.icon} src={transaction} alt="transaction" />
          </HorizontalIconCardItem>
          <HorizontalIconCardItem text="Dedicated Relationship Manager">
            <img className={classes.icon} src={manager} alt="manager" />
          </HorizontalIconCardItem>
          <div className={classes.notification}>
            *Companies older than 12 months are not eligible for the RAKstarter
            account
          </div>
        </HorizontalIconCardsContainer>
      )}
      {accountType === "Current Account" && (
        <HorizontalIconCardsContainer>
          <HorizontalIconCardItem minWidth="260px" text="A low minimum balance">
            <img className={classes.icon} src={balance} alt="balance" />
          </HorizontalIconCardItem>
          <HorizontalIconCardItem text="Available in AED, USD, EUR, GBP">
            <img
              className={classes.icon}
              src={availability}
              alt="availability"
            />
          </HorizontalIconCardItem>
          <HorizontalIconCardItem text="Preferential transaction fees through Digital Banking">
            <img className={classes.icon} src={transaction} alt="transaction" />
          </HorizontalIconCardItem>
          <HorizontalIconCardItem text="Dedicated Relationship Manager">
            <img className={classes.icon} src={manager} alt="manager" />
          </HorizontalIconCardItem>
        </HorizontalIconCardsContainer>
      )}
      {accountType === "RAKelite" && (
        <HorizontalIconCardsContainer>
          <HorizontalIconCardItem text="Fast track processing of all your banking requests">
            <img className={classes.icon} src={processing} alt="processing" />
          </HorizontalIconCardItem>
          <HorizontalIconCardItem text="Preferential transaction fees through Digital Banking">
            <img className={classes.icon} src={withdrawal} alt="withdrawal" />
          </HorizontalIconCardItem>
          <HorizontalIconCardItem text="Exclusive RAKelite service centers">
            <img
              className={classes.icon}
              src={serviceCenter}
              alt="service-center"
            />
          </HorizontalIconCardItem>
          <HorizontalIconCardItem text="Preferential exchange rates">
            <img className={classes.icon} src={exchange} alt="exchange" />
          </HorizontalIconCardItem>
          <HorizontalIconCardItem text="Free lounges, golf courses and valet services worldwide">
            <img className={classes.icon} src={lounge} alt="lounge" />
          </HorizontalIconCardItem>
          <HorizontalIconCardItem text="Dedicated Relationship Manager">
            <img className={classes.icon} src={manager} alt="manager" />
          </HorizontalIconCardItem>
        </HorizontalIconCardsContainer>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  applicationInfo: appConfigSelectors.getApplicationInfo(state)
});

export default connect(mapStateToProps)(withStyles(style)(AccountBenefits));
