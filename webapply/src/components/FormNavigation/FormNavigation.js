import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import cx from "classnames";
import Typography from "@material-ui/core/Typography";

import FormNavigationStep from "../FormNavigationStep";
import { Chat } from "../Chat/Chat";
import { IslamicBankingSwitcherMobile } from "../IslamicBankingSwitcher/IslamicBankingSwitcherMobile";
import { AccountInfo } from "./AccountInfo";
import routes from "../../routes";
import { accountsNames, formStepper, searchProspectStepper } from "../../constants";
import { checkIsShowAccountInfo, checkIsShowSmallBg } from "./utils";

import { useStyles } from "./styled";

export const FormNavigationComponent = ({
  applicationInfo: { islamicBanking, accountType },
  isLogin
}) => {
  const {
    location: { pathname }
  } = useHistory();

  const getRouteConfig = () =>
    formStepper.find(step => [step.path, step.relatedPath].some(path => pathname === path));

  const [isSwitcherShow, setIsSwitcherShow] = useState(false);

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
        pathname !== routes.login && (
          <ul>
            {(isLogin ? searchProspectStepper : formStepper).map(currentStep => (
              <FormNavigationStep
                key={currentStep.step}
                title={currentStep.title}
                activeStep={pathname === currentStep.path || pathname === currentStep.relatedPath}
                filled={(getRouteConfig() || {}).step > currentStep.step}
              />
            ))}
          </ul>
        )
      )}
      {!(isLogin || pathname === routes.login) && <Chat />}
    </div>
  );
};
