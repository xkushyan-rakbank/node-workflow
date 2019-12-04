import React from "react";
import { AccountTypeCard } from "../AccountTypeCard";
import { useStyles } from "./styled";
import { accountTypesDescription, SECTION_INDEX } from "./constants";

export const AccountCardComponent = ({ handleClick }) => {
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
              scrollToIndex={SECTION_INDEX}
              accountType={name}
              handleClick={handleClick}
            />
          </div>
        );
      })}
    </div>
  );
};
