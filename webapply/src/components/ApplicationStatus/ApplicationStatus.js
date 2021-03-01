import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button/Button";
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
  const history = useHistory();
  const redirectTo = route => {
    history.push(route);
    window.location.reload();
  };
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
                  <Button
                    key={index}
                    onClick={() => redirectTo(btn.link)}
                    className={classes.appStatusLink}
                  >
                    {btn.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
