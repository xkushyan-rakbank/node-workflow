import React from "react";
import { AccountTypeCard } from "../AccountTypeCard";
import { useStyles } from "./styled";
import { accountTypesDescription } from "./constants";

export const AccountCardComponent = ({ handleClick, handleClickMobile }) => {
  const classes = useStyles();
  return (
    <div className={classes.cardsContainer}>
      {accountTypesDescription.map(({ name, icon, title, description, buttonText }) => {
        return (
          <div key={name} className={classes.cardsContainerItem}>
            <AccountTypeCard
              iconSrc={icon}
              title={title}
              description={description}
              buttonText={buttonText}
              accountType={name}
              handleClick={handleClick}
              handleClickMobile={handleClickMobile}
            />
          </div>
        );
      })}
    </div>
  );
};
