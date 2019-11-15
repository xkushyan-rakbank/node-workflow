import React from "react";
import AccountTypeCard from "../AccountTypeCard";
import { styles } from "./styled";
import { accountTypesDescription, SECTION_INDEX } from "./constants";

const AccountCard = ({ handleClick }) => {
  const classes = styles();
  return (
    <div className={classes.cardsContainer}>
      {accountTypesDescription.map(accountType => {
        const { name, icon, title, description, buttonText } = accountType;
        return (
          <AccountTypeCard
            key={name}
            iconSrc={icon}
            title={title}
            description={description}
            buttonText={buttonText}
            scrollToIndex={SECTION_INDEX}
            accountType={name}
            handleClick={handleClick}
          />
        );
      })}
    </div>
  );
};

export default AccountCard;
