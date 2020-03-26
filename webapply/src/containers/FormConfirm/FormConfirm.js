import React from "react";

import { OTPform } from "../../components/OTPform";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { formStepper } from "../../constants";
import routes from "../../routes";

import { useStyles } from "./styled";

export const FormConfirm = () => {
  const classes = useStyles();

  useFormNavigation([false, false, formStepper]);

  return (
    <div className={classes.container}>
      <h2 className={classes.heading}>Confirm It’s You</h2>
      <OTPform
        redirectRoute={routes.companyInfo}
        classes={{
          centeredContainer: classes.centeredContainer,
          title: classes.title
        }}
      />
    </div>
  );
};
