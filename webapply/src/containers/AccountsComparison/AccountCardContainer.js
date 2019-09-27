import React from "react";
import { withStyles } from "@material-ui/core/styles";

import AccountTypeCard from "../../components/AccountTypeCard";

import startups_ic from "../../assets/icons/startups_ic.png";
import businesses_ic from "../../assets/icons/growing_businesses_ic.png";
import established_businesses_ic from "../../assets/icons/established_businesses_ic.png";

const style = {
  cardsContainer: {
    display: "flex",
    flexWrap: "nowrap",
    marginTop: 20,
    overflow: "auto",
    paddingBottom: "20px",
    marginBottom: "-20px",
    "@media only screen and (max-width: 1420px)": {
      marginTop: 10,
      flexGrow: "1"
    }
  }
};

const AccountCardContainer = ({ classes, handleClick }) => {
  const scrollToIndex = 2;

  return (
    <div className={classes.cardsContainer}>
      <AccountTypeCard
        iconSrc={startups_ic}
        title="For Startups and Entrepreneurs"
        differences={[
          "Zero balance account",
          "Preferential transaction fees",
          "Dedicated Relationship Manager"
        ]}
        buttonText="RAKstarter"
        scrollToIndex={scrollToIndex}
        accountType="RAKstarter"
        handleClick={handleClick}
      />
      <AccountTypeCard
        iconSrc={businesses_ic}
        title="For Growing Businesses"
        differences={[
          "Low balance account",
          "Preferential transaction fees",
          "Dedicated Relationship Manager "
        ]}
        buttonText="Current Account"
        scrollToIndex={scrollToIndex}
        accountType="Current Account"
        handleClick={handleClick}
      />
      <AccountTypeCard
        iconSrc={established_businesses_ic}
        title="For Established Businesses"
        differences={[
          "Free unlimited remittances",
          "Host of lifestyle benefits",
          "Dedicated Relationship Manager"
        ]}
        buttonText="RAKelite"
        scrollToIndex={scrollToIndex}
        accountType="RAKelite"
        handleClick={handleClick}
      />
    </div>
  );
};

export default withStyles(style)(AccountCardContainer);
