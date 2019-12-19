import React from "react";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

import { ContainedButton } from "../Buttons/ContainedButton";
import { MobileNotification } from "../Modals/index";

import { accountsInfo } from "./constants";
import routes from "../../routes";

import { useStyles } from "./styled";

export const AccountInfo = ({ accountType }) => {
  const classes = useStyles();
  const history = useHistory();
  const { location: { pathname } = {} } = history;

  const handleClick = path => () => history.push(path);
  const isApplicationOverview = pathname === routes.applicationOverview;

  return (
    <div className={classes.contentContainer}>
      {accountType && !isApplicationOverview ? (
        <>
          <div>
            <Typography variant="h2" component="h2" classes={{ root: classes.sectionTitle }}>
              {accountsInfo[accountType].title}
            </Typography>
            <Typography
              variant="subtitle1"
              component="span"
              classes={{ root: classes.sectionSubtitle }}
            >
              {accountsInfo[accountType].subtitle}
            </Typography>
          </div>
          <ContainedButton
            withRightArrow
            justify="flex-start"
            label="Apply now"
            handleClick={handleClick(routes.applicationOverview)}
          />
        </>
      ) : (
        <>
          <Typography variant="h2" component="h2" classes={{ root: classes.sectionTitle }}>
            {(() => {
              switch (pathname) {
                case routes.applicationOverview:
                  return "Opening an account has never been this simple.";
                case routes.MyApplications:
                  return "Your  applications, at a glance";
                case routes.comeBackLogin:
                  return "Good to see you back!";
                case routes.comeBackLoginVerification:
                  return "Confirm that it's you";
                default:
                  return "All businesses start with an account. Get yours now.";
              }
            })()}
          </Typography>
          {isApplicationOverview && (
            <>
              <div className="hide-on-mobile">
                <ContainedButton
                  withRightArrow
                  justify="flex-start"
                  label="Start application"
                  handleClick={handleClick(routes.applicantInfo)}
                />
              </div>
              <div className="show-on-mobile">
                <MobileNotification />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
