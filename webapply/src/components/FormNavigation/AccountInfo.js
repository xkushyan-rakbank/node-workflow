import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import cx from "classnames";
import Typography from "@material-ui/core/Typography";

import { getAccountType, getIsIslamicBanking } from "../../store/selectors/appConfig";
import { ContainedButton } from "../Buttons/ContainedButton";
import { MobileNotification } from "../Modals";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import { accountsInfo } from "./constants";
import routes from "../../routes";

export const useStyles = makeStyles(theme => ({
  contentContainer: {
    margin: 0,
    width: "100%",
    maxWidth: 340,
    [theme.breakpoints.up("xl")]: {
      maxWidth: "auto",
      width: "auto",
      paddingRight: "25px"
    }
  },
  sectionTitle: {
    maxWidth: 340,
    color: "#fff",
    fontSize: "48px",
    lineHeight: "1.17",
    fontWeight: 600,
    fontFamily: "Open Sans",
    marginBottom: 20,
    whiteSpace: "pre-line",
    "& + button": {
      marginTop: 60
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 38
    },
    [theme.breakpoints.only("xs")]: {
      marginBottom: 10,
      fontSize: 32,
      lineHeight: "36px"
    }
  },
  sectionSubtitle: {
    fontSize: "16px",
    lineHeight: "1.5",
    color: "#fff",
    maxWidth: 300,
    display: "block",
    fontWeight: "normal",
    fontFamily: "Open Sans",
    whiteSpace: "pre-wrap",
    "& + button": {
      marginTop: 60
    }
  },
  sectionButton: {
    marginTop: 60
  }
}));

export const AccountInfo = ({ className }) => {
  const classes = useStyles();
  const history = useHistory();
  const accountType = useSelector(getAccountType);
  const isIslamicBanking = useSelector(getIsIslamicBanking);
  const pushHistory = useTrackingHistory();
  const { location: { pathname } = {} } = history;
  const handleClick = useCallback(path => () => pushHistory(path), [pushHistory]);

  const isApplicationOverview = pathname === routes.applicationOverview;
  const isApplicationSubmitted = pathname === routes.ApplicationSubmitted;
  const isDetailedAccountPage = pathname === routes.detailedAccount;

  return (
    <div className={cx(classes.contentContainer, className)}>
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
            {isIslamicBanking
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
        <div className={classes.sectionButton}>
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
        </div>
      )}
    </div>
  );
};
