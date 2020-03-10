import React, { useState, lazy, Suspense, useContext } from "react";
import { useHistory } from "react-router-dom";
import cx from "classnames";
import Typography from "@material-ui/core/Typography";

import { FormNavigationStep } from "../FormNavigationStep";
import { VerticalPaginationContext } from "../VerticalPagination";
import { IslamicBankingSwitcherMobile } from "../IslamicBankingSwitcher/IslamicBankingSwitcherMobile";
import { AccountInfo } from "./AccountInfo";
import { Header } from "../Header";
import routes from "../../routes";
import { checkIsShowSmallBg, checkIsShowSmallMenu } from "./utils";
import { FormNavigationContext } from "./FormNavigationProvider";

import { useStyles } from "./styled";
import { useBlobColor } from "../../utils/useBlobColor/useBlobColor";
import { ReactComponent as BgBlob } from "../../assets/images/bg-blobs/bg-blob.svg";

const Chat = lazy(() => import("../../containers/WebChat/Chat"));

export const FormNavigationComponent = () => {
  const {
    location: { pathname }
  } = useHistory();
  const { isCurrentSectionVideo } = useContext(VerticalPaginationContext);
  const [isShowAccountInfo, isChatVisible, navigationSteps] = useContext(FormNavigationContext);
  const blobColor = useBlobColor();

  const [isSwitcherShow, setIsSwitcherShow] = useState(false);

  const classes = useStyles({
    color: blobColor,
    isSmallBg: checkIsShowSmallBg(pathname),
    isOpen: isSwitcherShow,
    accountsComparisonPage: routes.accountsComparison === pathname,
    smallMenu: checkIsShowSmallMenu(pathname)
  });

  const activeStep = navigationSteps.find(step =>
    [step.path, step.relatedPath].some(path => pathname === path)
  );
  const activeStepIndex = (activeStep || {}).step;

  return (
    <div className={cx(classes.formNav, classes.formNavBg, { active: isCurrentSectionVideo })}>
      <BgBlob className={classes.blob} />
      <div className={classes.formNavContent}>
        <Header />
        <IslamicBankingSwitcherMobile
          className={classes.formNavBg}
          isSwitcherShow={isSwitcherShow}
          toggleSwitcherShow={() => setIsSwitcherShow(!isSwitcherShow)}
        >
          <Typography variant="h2" component="h2" classes={{ root: classes.sectionTitle }}>
            What banking option do you prefer?
          </Typography>
        </IslamicBankingSwitcherMobile>
        {isShowAccountInfo ? (
          <AccountInfo />
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
