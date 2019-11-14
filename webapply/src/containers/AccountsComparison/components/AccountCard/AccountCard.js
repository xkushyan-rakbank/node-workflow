import React from "react";
import AccountTypeCard from "../AccountTypeCard";
import startups_ic from "../../../../assets/icons/startups_ic.png";
import businesses_ic from "../../../../assets/icons/growing_businesses_ic.png";
import established_businesses_ic from "../../../../assets/icons/established_businesses_ic.png";
import { accountsNames } from "../../../../constants/index";
import { styles } from "./styled";
import { SCROLL_TO_INDEX } from "./constants";

const AccountCard = ({ handleClick }) => {
  const classes = styles();
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
        scrollToIndex={SCROLL_TO_INDEX}
        accountType={accountsNames.starter}
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
        scrollToIndex={SCROLL_TO_INDEX}
        accountType={accountsNames.currentAccount}
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
        scrollToIndex={SCROLL_TO_INDEX}
        accountType={accountsNames.elite}
        handleClick={handleClick}
      />
    </div>
  );
};

export default AccountCard;
