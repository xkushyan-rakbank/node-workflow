import React, { useState, lazy, Suspense, useContext } from "react";
import { useHistory } from "react-router-dom";
import cx from "classnames";
import { useMediaQuery } from "@material-ui/core";

import { FormNavigationStep } from "../FormNavigationStep";
import { FormNavigationAgentStep } from "../FormNavigationAgentStep";
import { FormNavigationContext } from "./FormNavigationProvider";
import { AccountInfo } from "./AccountInfo";
import { Header } from "../Header";
import routes from "../../routes";
import { checkIsShowSmallBg, checkIsShowSmallMenu } from "./utils";
import { useBlobColor } from "../../utils/useBlobColor/useBlobColor";

import { useStyles } from "./styled";

import { ReactComponent as BgBlob } from "../../assets/images/bg-blobs/bg-blob.svg";
import { VIEW_IDS } from "../../constants";

const Chat = lazy(() => import("../../containers/WebChat/Chat"));

export const FormNavigationComponent = () => {
  const isMobile = useMediaQuery("(max-width: 767px") || window.innerWidth <= 768;
  const {
    location: { pathname }
  } = useHistory();
  const navContext = useContext(FormNavigationContext);
  const [isSwitcherShow, setIsSwitcherShow] = useState(false);
  const blobColor = useBlobColor(!navContext);
  const classes = useStyles({
    color: blobColor,
    isSmallBg: checkIsShowSmallBg(pathname),
    isOpen: isSwitcherShow,
    accountsComparisonPage: routes.quickapplyLanding === pathname,
    smallMenu: checkIsShowSmallMenu(pathname)
  });
  let navSteps = [];

  if (!navContext) {
    return null;
  }

  const [
    isShowAccountInfo,
    isChatVisible,
    navigationSteps = [],
    isCollapsible = true,
    isAgentPage = false
  ] = navContext;

  const activeStep =
    navigationSteps?.find(step =>
      [step.path, ...(step.relatedPath ?? "")].some(path => pathname === path)
    ) || [];

  const activeStepIndex = (activeStep || {}).step;

  if (isMobile) {
    navSteps =
      activeStep && Object.keys(activeStep).length === 0
        ? []
        : activeStepIndex < 6
        ? [activeStep, navigationSteps[(activeStep?.step)]]
        : [activeStep];
  } else {
    navSteps = navigationSteps;
  }

  const hideKeyboardOnExpansion = e => {
    if (!["textarea", "text"].includes(e.target.tagName.toLowerCase())) {
      document.activeElement && document.activeElement.blur();
    }
  };

  const showTwoStepsNavForMobile =
    Object.values(VIEW_IDS).some(path => pathname.includes(path)) ||
    [
      "/ApplicantInfo",
      "/VerifyMobileOTP",
      "/agent/Login",
      "/VerifyEmailOTP",
      "/Congratulations"
    ].some(path => pathname.includes(path));

  return (
    <div
      className={cx(
        classes.formNav,
        classes.formNavBg,
        { [classes.formTwoStepNav]: showTwoStepsNavForMobile && isMobile },
        { active: !isCollapsible }
      )}
      onClick={hideKeyboardOnExpansion}
    >
      <BgBlob className={classes.blob} />
      <div className={classes.formNavContent}>
        <Header />
        {isShowAccountInfo ? (
          <AccountInfo />
        ) : (
          <>
            {isAgentPage ? (
              <ul>
                {navigationSteps.map(step => (
                  <FormNavigationAgentStep
                    path={step.path}
                    key={step.step}
                    title={step.title}
                    activeStep={activeStepIndex === step.step}
                    isDisplayProgress={navigationSteps.length > 1}
                    filled={activeStepIndex > step.step}
                  />
                ))}
              </ul>
            ) : (
              <>
                <ul>
                  {navSteps?.map(step => (
                    <FormNavigationStep
                      key={step?.step}
                      title={step?.title}
                      activeStep={activeStepIndex === step?.step}
                      isDisplayProgress={navigationSteps.length > 1}
                      filled={activeStepIndex > step?.step}
                    />
                  ))}
                </ul>
              </>
            )}
          </>
        )}
        {isChatVisible && (
          <div className={classes.chatButton}>
            <Suspense fallback={<div>Loading...</div>}>
              <Chat />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
};
