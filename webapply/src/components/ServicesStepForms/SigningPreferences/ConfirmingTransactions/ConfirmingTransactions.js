import React from "react";
import { withStyles } from "@material-ui/core";

import Subtitle from "../../../Subtitle";
import InfoTitle from "../../../InfoTitle";

import { styled } from "./styled";

const ConfirmingTransactions = ({ classes }) => (
  <div className={classes.contactsTitle}>
    <Subtitle title="Contacts for re-confirming transactions" />
    <InfoTitle
      typeInfo
      title="You can have up to two contacts"
      classes={{ wrapper: classes.infoTitle }}
    />
  </div>
);

export default withStyles(styled)(ConfirmingTransactions);
