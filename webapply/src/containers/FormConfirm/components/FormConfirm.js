import React from "react";

import { Otp } from "../..//Otp";
import routes from "../../../routes";

import { useStyles } from "./styled";

export const FormConfirm = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h2 className={classes.heading}>Confirm It’s You</h2>
      <Otp
        redirectRoute={routes.companyInfo}
        classes={{
          centeredContainer: classes.centeredContainer,
          title: classes.title
        }}
      />
    </div>
  );
};
