import React from "react";
import { AccountTypeCard } from "../AccountTypeCard";
import { useStyles } from "./styled";
import { accountTypesDescription } from "./constants";

export const AccountCardComponent = props => {
  const classes = useStyles();
  return (
    <div className={classes.cardsContainer}>
      {accountTypesDescription.map(({ name, ...item }) => (
        <div key={name} className={classes.cardsContainerItem}>
          <AccountTypeCard {...item} {...props} accountType={name} />
        </div>
      ))}
    </div>
  );
};
