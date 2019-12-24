import React from "react";
import { Link } from "react-router-dom";
import routes from "../../routes";
import { useStyles } from "./styled";

export const ApplicationStatus = ({ statusFromServer, content }) => {
  const classes = useStyles();

  return (
    <div className={classes.appStatus}>
      <img src={content.icon} alt="error" />
      <div className={classes.message}>
        <p>{statusFromServer ? statusFromServer.screeningReason : content.text}</p>
        {statusFromServer && (
          <Link to={routes.accountsComparison} className={classes.appStatusLink}>
            See products
          </Link>
        )}
      </div>
    </div>
  );
};
