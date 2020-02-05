import React from "react";
import { AccountTypeCard } from "../AccountTypeCard";
import { useStyles } from "./styled";
import { accountTypesDescription } from "./constants";

export const AccountCardComponent = ({ setAccountType, handleClickMobile }) => {
  const classes = useStyles();
  return (
    <div className={classes.cardsContainer}>
      {accountTypesDescription.map(({ name, icon, title, description, buttonText }) => (
        <div key={name} className={classes.cardsContainerItem}>
          <AccountTypeCard
            iconSrc={icon}
            title={title}
            description={description}
            buttonText={buttonText}
            accountType={name}
            setAccountType={setAccountType}
            handleClickMobile={handleClickMobile}
          />
        </div>
      ))}
    </div>
  );
};
