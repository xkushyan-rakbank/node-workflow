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
import { accountsNames, formStepper, searchProspectStepper } from "../../constants";
import { accountsInfo } from "./constants";
import { checkIsShowAccountInfo, checkIsShowSmallBg } from "./utils";

import { useStyles } from "./styled";

const AccountInfo = ({ accountType }) => {
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

const FormStepper = ({ step, path, isLogin }) => (
  <ul>
    {(isLogin ? searchProspectStepper : formStepper).map(currentStep => (
      <FormNavigationStep
        key={currentStep.step}
        title={currentStep.title}
        activeStep={path === currentStep.path || path === currentStep.relatedPath}
        filled={step > currentStep.step}
      />
    ))}
  </ul>
);

export const FormNavigationComponent = ({
  applicationInfo: { islamicBanking, accountType },
  isLogin
}) => {
  const {
    location: { pathname, key }
  } = useHistory();

  const getRouteConfig = () =>
    formStepper.find(step => [step.path, step.relatedPath].some(path => pathname === path));

  const [isSwitcherShow, setIsSwitcherShow] = useState(false);
  const [step, setStep] = useState((getRouteConfig() || {}).step || 1);

  useEffect(() => {
    const { step = 1 } = getRouteConfig() || {};
    setStep(step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, step, pathname]);

  const classes = useStyles();
  const bgTypeClass = cx({ brown: accountType === accountsNames.elite, green: islamicBanking });
  const toggleSwitcherShow = () => setIsSwitcherShow(!isSwitcherShow);

  return (
    <div
      className={cx(classes.formNav, classes.formNavBg, bgTypeClass, {
        "small-bg": checkIsShowSmallBg(pathname),
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
      {checkIsShowAccountInfo(pathname) ? (
        <AccountInfo classes={classes} accountType={accountType} />
      ) : (
        pathname !== routes.login && <FormStepper step={step} path={pathname} isLogin={isLogin} />
      )}
      {!(isLogin || pathname === routes.login) && <Chat />}
    </div>
  );
};
