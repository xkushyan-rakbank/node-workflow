import React from "react";
import { AccountTypeCard } from "../AccountTypeCard";
import { useStyles } from "./styled";
import { accountTypesDescription } from "./constants";

export const AccountCardComponent = ({ setAccountType, handleClickMobile }) => {
  const classes = useStyles();
  return (
    <div className={classes.cardsContainer}>
      {accountTypesDescription.map(({ name, ...item }) => (
        <div key={name} className={classes.cardsContainerItem}>
          <AccountTypeCard
            {...item}
            accountType={name}
            setAccountType={setAccountType}
            handleClickMobile={handleClickMobile}
          />
        </div>
      ))}
    </div>
  );
};
