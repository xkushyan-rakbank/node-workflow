import React from "react";
import { Link } from "react-router-dom";
import routes from "../../routes";
import { useStyles } from "./styled";

export const ApplicationStatus = ({ icon, text, link }) => {
  const classes = useStyles();

  return (
    <div className={classes.appStatus}>
      <img src={icon} alt="error" />
      <div className={classes.message}>
        <p>{text}</p>
        {link && (
          <Link to={routes.accountsComparison} className={classes.appStatusLink}>
            See products
          </Link>
        )}
      </div>
    </div>
  );
};
