import React from "react";

import routes from "../../routes";
import { OTPform } from "../../components/OTPform";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";

import { useStyles } from "./styled";

export const ComeBackVerification = () => {
  const classes = useStyles();
  useFormNavigation([true, false]);

  return (
    <div className={classes.container}>
      <OTPform redirectRoute={routes.MyApplications} />
    </div>
  );
};
