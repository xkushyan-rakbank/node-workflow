import React from "react";

import { Subtitle } from "../../../../../components/Subtitle";
import InfoTitle from "../../../../../components/InfoTitle";

import { useStyles } from "./styled";

export const ConfirmingTransactions = () => {
  const classes = useStyles();

  return (
    <div className={classes.contactsTitle}>
      <Subtitle title="Contacts for re-confirming transactions" />
      <InfoTitle
        typeInfo
        title="You can have up to two contacts"
        classes={{ wrapper: classes.infoTitle }}
      />
    </div>
  );
};
