import React, { useState, lazy, Suspense, useContext } from "react";
import { useHistory } from "react-router-dom";
import cx from "classnames";
import Typography from "@material-ui/core/Typography";

import { FormNavigationStep } from "../FormNavigationStep";
import { FormNavigationAgentStep } from "../FormNavigationAgentStep";
import { FormNavigationContext } from "./FormNavigationProvider";
import { IslamicSwitcher } from "../IslamicSwitcher";
import { AccountInfo } from "./AccountInfo";
import { Header } from "../Header";
import routes from "../../routes";
import { checkIsShowSmallBg, checkIsShowSmallMenu } from "./utils";
import { useBlobColor } from "../../utils/useBlobColor/useBlobColor";

import { useStyles } from "./styled";

import { ReactComponent as BgBlob } from "../../assets/images/bg-blobs/bg-blob.svg";

const Chat = lazy(() => import("../../containers/WebChat/Chat"));

export const FormNavigationComponent = () => {
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
    accountsComparisonPage: routes.accountsComparison === pathname,
    smallMenu: checkIsShowSmallMenu(pathname)
  });

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

  const activeStep = navigationSteps.find(step =>
    [step.path, ...(step.relatedPath ?? "")].some(path => pathname === path)
  );
  const activeStepIndex = (activeStep || {}).step;

  const hideKeyboardOnExpansion = () => {
    document.activeElement && document.activeElement.blur();
  }

  return (
    <div className={cx(classes.formNav, classes.formNavBg, { active: !isCollapsible, })} onClick={hideKeyboardOnExpansion}>
      <BgBlob className={classes.blob} />
      <div className={classes.formNavContent}>
        <Header />
        <IslamicSwitcher
          className={classes.formNavBg}
          isSwitcherShow={isSwitcherShow}
          toggleSwitcherShow={() => setIsSwitcherShow(!isSwitcherShow)}
        >
          <Typography variant="h2" component="h2" classes={{ root: classes.sectionTitle }}>
            What banking option do you prefer?
          </Typography>
        </IslamicSwitcher>
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
              <ul>
                {navigationSteps.map(step => (
                  <FormNavigationStep
                    key={step.step}
                    title={step.title}
                    activeStep={activeStepIndex === step.step}
                    isDisplayProgress={navigationSteps.length > 1}
                    filled={activeStepIndex > step.step}
                  />
                ))}
              </ul>
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
