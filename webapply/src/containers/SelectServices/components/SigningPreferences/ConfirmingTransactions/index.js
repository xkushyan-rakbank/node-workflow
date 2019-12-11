import React from "react";

import { Subtitle } from "../../../../../components/Subtitle";
import { InfoTitle } from "../../../../../components/InfoTitle";

import { useStyles } from "./styled";

export const ConfirmingTransactions = () => {
  const classes = useStyles();

  return (
    <div className={classes.contactsTitle}>
      <Subtitle
        title="Contacts for re-confirming transactions"
        classes={{ wrapper: classes.subtitle }}
      />
      <InfoTitle title="You can have up to two contacts" />
    </div>
  );
};
