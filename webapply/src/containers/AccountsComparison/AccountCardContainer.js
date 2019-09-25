import React from "react";
import { withStyles } from "@material-ui/core/styles";

import AccountTypeCard from "../../components/AccountTypeCard";

import startups_ic from "../../assets/icons/startups_ic.png";
import businesses_ic from "../../assets/icons/growing_businesses_ic.png";
import established_businesses_ic from "../../assets/icons/established_businesses_ic.png";

const style = {
  cardsContainer: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: 20,
    "@media only screen and (max-width: 1420px)": {
      flexDirection: "column",
      marginTop: 10
    },
    "@media only screen and (max-width: 1100px)": {
      flexWrap: "nowrap",
      overflowY: "scroll",
      flexDirection: "row"
    }
  }
};

const AccountCardContainer = ({ classes, handleClick }) => {
  const scrollToIndex = 2;

  return (
    <div className={classes.cardsContainer}>
      <AccountTypeCard
        iconSrc={startups_ic}
        title="For Startups or Entrepreneurs"
        differences={[
          "Zero balance account",
          "Preferential transaction fees",
          "Dedicated Relationship Manager"
        ]}
        buttonText="RAKstarter"
        scrollToIndex={scrollToIndex}
        handleClick={handleClick}
      />
      <AccountTypeCard
        iconSrc={businesses_ic}
        title="For Established Businesses"
        differences={["Low balance account", "Low fees", "Dedicated service"]}
        buttonText="Current Account"
        scrollToIndex={scrollToIndex}
        handleClick={handleClick}
      />
      <AccountTypeCard
        iconSrc={established_businesses_ic}
        title="For Exclusive Banking Privileges"
        differences={[
          "Preferential pricing",
          "No fees",
          "Fast-tracked services"
        ]}
        buttonText="RAKelite"
        scrollToIndex={scrollToIndex}
        handleClick={handleClick}
      />
    </div>
  );
};

export default withStyles(style)(AccountCardContainer);
