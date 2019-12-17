import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import { SectionTitleWithInfo } from "../../components/SectionTitleWithInfo";
import HorizontalIconCardsContainer from "../../components/HorizontalIconCards/HorizontalIconCardsContainer";
import HorizontalIconCardItem from "../../components/HorizontalIconCards/HorizontalIconCardItem";
import * as appConfigSelectors from "../../store/selectors/appConfig";
import { useIconsByAccount } from "../../utils/useIconsByAccount";
import { InfoNote } from "../../components/InfoNote";
import { accountsNames, mobileResolution } from "../../constants";

const style = {
  indent: {
    marginBottom: "20px"
  },
  notification: {
    width: "100%",
    paddingTop: "20px",
    fontSize: "12px",
    textAlign: "center",
    color: "#888888",
    top: "calc(100vh - 290px)",
    position: "absolute"
  },
  icon: {
    width: "64px",
    height: "64px",
    "@media only screen and (max-width: 1300px)": {
      width: "56px",
      height: "56px"
    }
  },
  styleInfoNotes: {
    margin: "0 auto",
    [`@media only screen and (min-width: ${mobileResolution + 1}px)`]: {
      position: "absolute",
      bottom: 65,
      left: 0,
      right: 0
    }
  }
};

const AccountBenefits = ({ classes, accountType }) => {
  const getText = accountType => {
    switch (accountType) {
      case "RAKstarter":
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
  const {
    availability,
    balance,
    processing,
    transaction,
    manager,
    withdrawal,
    serviceCenter,
    exchange,
    lounge
  } = useIconsByAccount();

  const mockData = {
    RAKstarter: [
      { key: 1, text: "No minimum balance required", icon: balance, alt: "balance" },
      { key: 2, text: "Available in AED, USD, EUR, GBP", icon: availability, alt: "availability" },
      {
        key: 3,
        text: "Preferential transaction fees through Digital Banking",
        icon: transaction,
        alt: "transaction"
      },
      { key: 4, text: "Dedicated Relationship Manager", icon: manager, alt: "manager" }
    ],
    "Current Account": [
      { key: 1, text: "Low minimum balance required", icon: balance, alt: "balance" },
      { key: 2, text: "Available in AED, USD, EUR, GBP", icon: availability, alt: "availability" },
      {
        key: 3,
        text: "Preferential transaction fees through Digital Banking",
        icon: transaction,
        alt: "transaction"
      },
      { key: 4, text: "Dedicated Relationship Manager", icon: manager, alt: "manager" }
    ],
    RAKelite: [
      {
        key: 1,
        text: "Fast track processing of all your banking requests",
        icon: processing,
        alt: "processing"
      },
      {
        key: 2,
        text: "Enhanced daily withdrawal limits",
        icon: withdrawal,
        alt: "withdrawal"
      },
      {
        key: 3,
        text: "Exclusive RAKelite service centers",
        icon: serviceCenter,
        alt: "serviceCenter"
      },
      { key: 4, text: "Preferential exchange rates", icon: exchange, alt: "exchange" },
      {
        key: 5,
        text: "Free lounges, golf courses and valet services worldwide",
        icon: lounge,
        alt: "lounge"
      },
      { key: 6, text: "Dedicated Relationship Manager", icon: manager, alt: "manager" }
    ]
  };

  const data = accountType ? mockData[accountType] : [];

  const isShowInfoNote = accountType === accountsNames.starter;

  return (
    <>
      <div className={classes.indent}>
        <SectionTitleWithInfo title={text} />
      </div>
      <HorizontalIconCardsContainer>
        {data.map(item => (
          <HorizontalIconCardItem key={item.key} text={item.text}>
            <img className={classes.icon} src={item.icon} alt={item.alt} />
          </HorizontalIconCardItem>
        ))}
        {isShowInfoNote && (
          <div className={classes.styleInfoNotes}>
            <InfoNote text="*Companies older than 12 months are not eligible for the RAKstarter account" />
          </div>
        )}
      </HorizontalIconCardsContainer>
    </>
  );
};

const mapStateToProps = state => ({
  applicationInfo: appConfigSelectors.getApplicationInfo(state)
});

export default connect(mapStateToProps)(withStyles(style)(AccountBenefits));
