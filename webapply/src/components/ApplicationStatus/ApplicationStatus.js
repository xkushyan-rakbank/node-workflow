import React from "react";
import { Link } from "react-router-dom";
import routes from "../../routes";
import { useStyles } from "./styled";
import { UploadLimitComponent } from "../../containers/UploadDocuments/components/UploadLimit/UploadLimit";

//ro-assist-brd2-3
const accountComparisionRoute = {
  link: routes.accountsComparison,
  label: "See products"
};
export const ApplicationStatus = ({
  icon,
  text,
  link,
  screeningType = "",
  buttons = [accountComparisionRoute]
}) => {
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
            {/* ro-assist-brd2-3 */}
            {link && (
              <div className={classes.linkWrapper}>
                {buttons.map((btn, index) => (
                  <Link key={index} to={btn.link} className={classes.appStatusLink}>
                    {btn.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
