import React from "react";
import { AccountTypeCard } from "../AccountTypeCard";
import { useStyles } from "./styled";
import { accountTypesDescription } from "./constants";
import { Grid } from "@material-ui/core";
import cx from "classnames";

export const AccountCardComponent = props => {
  const classes = useStyles();
  return (
    <Grid container>
      {accountTypesDescription.map(({ name, accountName, ...item }) => (
        <Grid
          item
          sm={3}
          key={name}
          className={cx(
            classes.accountTypeWrapper,
            props.accountSticky ? classes.accountTypeSticky : classes.accountType
          )}
        >
          <AccountTypeCard
            {...item}
            {...props}
            accountType={name}
            accountTypeName={accountName}
            isSticky={props.accountSticky}
          />
        </Grid>
      ))}
    </Grid>
  );
};
