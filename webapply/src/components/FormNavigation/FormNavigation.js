import React, { useState, lazy, Suspense, useContext } from "react";
import { useHistory } from "react-router-dom";
import cx from "classnames";
import Typography from "@material-ui/core/Typography";

import { FormNavigationStep } from "../FormNavigationStep";
import { VerticalPaginationContext } from "../VerticalPagination";
import { IslamicBankingSwitcherMobile } from "../IslamicBankingSwitcher/IslamicBankingSwitcherMobile";
import { AccountInfo } from "./AccountInfo";
import { Header } from "../Header";
import routes, { agentBaseName } from "../../routes";
import { formStepper, searchProspectStepper } from "../../constants";
import { Blob } from "./Blob";
import { checkIsShowAccountInfo, checkIsShowSmallBg, checkIsShowSmallMenu } from "./utils";

import { useStyles } from "./styled";
import { useBlobColor } from "../../utils/useBlobColor/useBlobColor";

const Chat = lazy(() => import("../../containers/WebChat/Chat"));

export const FormNavigationComponent = ({ isApplyEditApplication }) => {
  const {
    location: { pathname }
  } = useHistory();
  const { isCurrentSectionVideo } = useContext(VerticalPaginationContext);
  const blobColor = useBlobColor();

  const getRouteConfig = () =>
    formStepper.find(step => [step.path, step.relatedPath].some(path => pathname === path));

  const [isSwitcherShow, setIsSwitcherShow] = useState(false);

  const classes = useStyles({
    color: blobColor,
    isSmallBg: checkIsShowSmallBg(pathname),
    isOpen: isSwitcherShow,
    accountsComparisonPage: routes.accountsComparison === pathname,
    smallMenu: checkIsShowSmallMenu(pathname)
  });

  const isChatVisible =
    !isApplyEditApplication &&
    pathname.indexOf(agentBaseName) === -1 &&
    ![
      routes.accountsComparison,
      routes.detailedAccount,
      routes.applicationOverview,
      routes.applicantInfo,
      routes.verifyOtp,
      routes.comeBackLogin,
      routes.comeBackLoginVerification
    ].includes(pathname);

  return (
    <div className={cx(classes.formNav, classes.formNavBg, { active: isCurrentSectionVideo })}>
      <Blob className={classes.blob} />
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
        {checkIsShowAccountInfo(pathname) ? (
          <AccountInfo className="small-menu-hide" />
        ) : (
          pathname !== routes.login && (
            <ul>
              {(pathname.startsWith(agentBaseName) ? searchProspectStepper : formStepper).map(
                currentStep => (
                  <FormNavigationStep
                    key={currentStep.step}
                    title={currentStep.title}
                    activeStep={
                      pathname === currentStep.path || pathname === currentStep.relatedPath
                    }
                    filled={(getRouteConfig() || {}).step > currentStep.step}
                  />
                )
              )}
            </ul>
          )
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
