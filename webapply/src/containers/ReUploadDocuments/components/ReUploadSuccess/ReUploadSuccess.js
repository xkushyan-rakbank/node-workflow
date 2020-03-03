import React from "react";
import { useIconsByAccount } from "../../../../utils/useIconsByAccount";
import { BackLink } from "../../../../components/Buttons/BackLink";
import routes from "../../../../routes";
import { useStyles } from "./styled";

export const ReUploadSuccess = () => {
  const classes = useStyles();
  const { submitted } = useIconsByAccount();
  return (
    <div className={classes.root}>
      <img src={submitted} alt="Successful submit" className={classes.icon} />
      <h2 className={classes.title}>Documents submitted!</h2>
      <p className={classes.subtitle}>
        Hold tight. We will review them and call you back very soon.
      </p>
      <BackLink
        className={classes.backLink}
        path={routes.MyApplications}
        text="Back to Applications"
      />
    </div>
  );
};
