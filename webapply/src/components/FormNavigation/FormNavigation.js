import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import cx from "classnames";
import Typography from "@material-ui/core/Typography";

import FormNavigationStep from "../FormNavigationStep";
import Chat from "../Chat";
import { ContainedButton } from "../Buttons/ContainedButton";
import { MobileNotification } from "../Modals/index";
import { IslamicBankingSwitcherMobile } from "../IslamicBankingSwitcher/IslamicBankingSwitcherMobile";

import routes from "../../routes";
import { accountsNames, formStepper, searchProspectStepper } from "../../constants/index";
import { accountsInfo } from "./constants";

import { useStyles } from "./styled";

const AccountInfo = ({ accountType }) => {
  const classes = useStyles();
  const history = useHistory();
  const { location: { pathname } = {} } = history;

  const handleClick = path => history.push(path);

  const isApplicationOverview = pathname === routes.applicationOverview;
  const isMyApplications = pathname === routes.MyApplications;
  const isComeBackLogin = pathname === routes.comeBackLogin;
  const isComeBackVerification = pathname === routes.comeBackLoginVerification;
  const isReUploadDocuments = pathname === routes.reUploadDocuments;

  return (
    <div className={classes.contentContainer}>
      {accountType && pathname !== routes.applicationOverview ? (
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
            handleClick={() => handleClick(routes.applicationOverview)}
          />
        </>
      ) : (
        <>
          <Typography variant="h2" component="h2" classes={{ root: classes.sectionTitle }}>
            {isApplicationOverview
              ? "Opening an account has never been this simple."
              : isMyApplications
              ? "Your  applications, at a glance"
              : isComeBackLogin
              ? "Good to see you back!"
              : isReUploadDocuments
              ? "Edit your application"
              : isComeBackVerification
              ? "Confirm that it's you"
              : "All businesses start with an account. Get yours now."}
          </Typography>
          {isApplicationOverview && (
            <>
              <div className="hide-on-mobile">
                <ContainedButton
                  withRightArrow
                  justify="flex-start"
                  label="Start application"
                  handleClick={() => handleClick(routes.applicantInfo)}
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

const FormStepper = ({ step, path, checkLoginStatus }) =>
  checkLoginStatus ? (
    <ul>
      {searchProspectStepper.map(item => (
        <FormNavigationStep
          key={item.step}
          title={item.title}
          activeStep={path === item.path || path === item.relatedPath}
          filled={step > item.step}
        />
      ))}
    </ul>
  ) : (
    <ul>
      {formStepper.map(item => (
        <FormNavigationStep
          key={item.step}
          title={item.title}
          activeStep={path === item.path || path === item.relatedPath}
          filled={step > item.step}
        />
      ))}
    </ul>
  );

const getAccountTypeClass = (accountType, islamicBanking) => {
  if (accountType && accountType === accountsNames.elite) {
    return " brown";
  } else if (islamicBanking) {
    return " green";
  } else {
    return "";
  }
};

export const FormNavigationComponent = ({
  applicationInfo: { islamicBanking, accountType },
  checkLoginStatus
}) => {
  const history = useHistory();
  const {
    location: { pathname, key }
  } = history;

  const getRouteConfig = () =>
    formStepper.find(step => [step.path, step.relatedPath].some(path => pathname === path));

  const [isSwitcherShow, setIsSwitcherShow] = useState(false);
  const [step, setStep] = useState((getRouteConfig() || {}).step || 1);

  useEffect(() => {
    const { step = 1 } = getRouteConfig() || {};
    setStep(step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, step, pathname]);

  const toggleSwitcherShow = () => {
    setIsSwitcherShow(!isSwitcherShow);
  };

  const classes = useStyles();

  const showAccountInfo = new Set([
    routes.accountsComparison,
    routes.detailedAccount,
    routes.applicationOverview,
    routes.MyApplications,
    routes.comeBackLogin,
    routes.comeBackLoginVerification,
    routes.reUploadDocuments
  ]).has(pathname);

  const showSmallBg = new Set([
    routes.accountsComparison,
    routes.comeBackLogin,
    routes.comeBackLoginVerification
  ]).has(pathname);

  const bgTypeClass = getAccountTypeClass(accountType, islamicBanking);

  return (
    <div
      className={cx(classes.formNav, classes.formNavBg, bgTypeClass, {
        "small-bg": showSmallBg,
        open: isSwitcherShow,
        "has-video": routes.accountsComparison === pathname
      })}
    >
      <IslamicBankingSwitcherMobile
        className={cx(classes.formNavBg, bgTypeClass)}
        isSwitcherShow={isSwitcherShow}
        toggleSwitcherShow={toggleSwitcherShow}
      >
        <Typography variant="h2" component="h2" classes={{ root: classes.sectionTitle }}>
          What banking option do you prefer?
        </Typography>
      </IslamicBankingSwitcherMobile>
      {showAccountInfo ? (
        <AccountInfo classes={classes} accountType={accountType} />
      ) : (
        pathname !== routes.login && (
          <FormStepper step={step} path={pathname} checkLoginStatus={checkLoginStatus} />
        )
      )}
      {!(checkLoginStatus || pathname === routes.login) && <Chat />}
    </div>
  );
};
