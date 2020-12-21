import React from "react";
import { Link } from "react-router-dom";
import routes from "../../routes";
import { useStyles } from "./styled";
import { UploadLimitComponent } from "../../containers/UploadDocuments/components/UploadLimit/UploadLimit";

export const ApplicationStatus = ({ icon, text, link, screeningType = "" }) => {
  const classes = useStyles();

  return (
    <>
      {screeningType === "Total No of Documents uploaded check" ? (
        <UploadLimitComponent />
      ) : (
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
      )}
    </>
  );
};
