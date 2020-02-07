import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { sendGoogleAnalyticsMetrics } from "../../store/actions/googleAnalytics";
import { ContainedButton } from "../Buttons/ContainedButton";
import { MobileNotification } from "../Modals/index";

import { accountsInfo, gaEventsMap } from "./constants";
import routes from "../../routes";

import { useStyles } from "./styled";

export const AccountInfo = ({ accountType, islamicBanking }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { location: { pathname } = {} } = history;
  const handleClick = useCallback(
    path => () => {
      dispatch(sendGoogleAnalyticsMetrics(gaEventsMap[path]));
      history.push(path);
    },
    [dispatch, history]
  );

  const isApplicationOverview = pathname === routes.applicationOverview;
  const isApplicationSubmitted = pathname === routes.ApplicationSubmitted;
  const isDetailedAccountPage = pathname === routes.detailedAccount;

  return (
    <div className={classes.contentContainer}>
      <Typography variant="h2" component="h2" classes={{ root: classes.sectionTitle }}>
        {(() => {
          switch (pathname) {
            case routes.detailedAccount:
              return accountType ? accountsInfo[accountType].title : "";
            case routes.applicationOverview:
              return "Opening an account has never been this simple.";
            case routes.MyApplications:
              return "Your  applications, at a glance";
            case routes.comeBackLogin:
              return "Good to see you back!";
            case routes.comeBackLoginVerification:
              return "Confirm that it's you";
            case routes.ApplicationSubmitted:
              return "Check it out. Application submitted!";
            case routes.reUploadDocuments:
              return "Edit your application";
            case routes.accountsComparison:
            default:
              return "All businesses start with an account. Get yours now.";
          }
        })()}
      </Typography>
      {accountType && isDetailedAccountPage && (
        <>
          <Typography
            variant="subtitle1"
            component="span"
            classes={{ root: classes.sectionSubtitle }}
          >
            {islamicBanking
              ? accountsInfo[accountType].islamicSubtitle
              : accountsInfo[accountType].subtitle}
          </Typography>
          <ContainedButton
            withRightArrow
            justify="flex-start"
            label="Apply now"
            handleClick={handleClick(routes.applicationOverview)}
          />
        </>
      )}
      {isApplicationSubmitted && (
        <ContainedButton
          withRightArrow
          justify="flex-start"
          label="Check status"
          handleClick={handleClick(routes.comeBackLogin)}
        />
      )}
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
    </div>
  );
};
