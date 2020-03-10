import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { OTPform } from "../../components/OTPform";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import routes from "../../routes";

const useStyles = makeStyles({
  centeredContainer: {
    marginTop: 0
  },
  container: {
    "& .title": {
      marginBottom: "0",
      fontSize: "48px"
    }
  },
  title: {
    fontSize: "20px"
  }
});

export const FormConfirm = () => {
  const classes = useStyles();

  useFormNavigation([true, false]);

  return (
    <div className={classes.container}>
      <h2 className="title">Confirm It’s You</h2>

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
