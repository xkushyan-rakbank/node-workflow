import React from "react";
import { useSelector } from "react-redux";

import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { useViewId } from "../../utils/useViewId";
import { formStepper } from "../../constants";
import { useIconsByAccount } from "../../utils/useIconsByAccount";
import { useStyles } from "./styled";
import { SectionTitleWithInfo } from "../../components/SectionTitleWithInfo";
import { ContainedButton } from "../../components/Buttons/ContainedButton";
import routes from "../../routes";
import { DisclaimerNote } from "../../components/InfoNote/DisclaimerNote";
import { ICONS, Icon } from "../../components/Icons";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import { getAccountType, getProspectId } from "../../store/selectors/appConfig";

export const CongratulationsScreen = () => {
  useFormNavigation([true, true, formStepper]);
  useViewId();

  const pushHistory = useTrackingHistory();

  const classes = useStyles();
  const { submitted } = useIconsByAccount();
  const prospectId = useSelector(getProspectId);
  const accountType = useSelector(getAccountType);

  const navigateToDashboard = () => {
    pushHistory(routes.MyApplications, true);
  };

  const accountTypeLabel = accountType === "Current Account" ? "Current" : accountType;

  return (
    <>
      <img
        width={120}
        height={125}
        src={submitted}
        alt="checked"
        className={classes.congratulionIcon}
      />
      <SectionTitleWithInfo
        title={"Congratulations!"}
        info={`You've successfully submitted your ${accountTypeLabel} account application.`}
      />
      <ContainedButton
        withRightArrow
        justifyContent="flex-start"
        label="Track my application"
        className={classes.trackApplicationBtn}
        handleClick={() => navigateToDashboard()}
      />
      <div className={classes.applicationDetailWrapper}>
        <div>
          <p className={classes.applicationNumber}>{prospectId}</p>
          <p className={classes.applicationDesc}>Your application reference number </p>
        </div>
        <DisclaimerNote
          className={classes.infoWrapper}
          text={
            "You can look up your application at any time by using the above reference number. We may also ask for this number if you contact Customer Care about your application."
          }
          customIcon={<Icon name={ICONS.info} className={classes.infoIcon} alt="infoIcon" />}
        />
        <div>
          <p className={classes.applicationNumber}>Here’s what happens next...</p>
          <p className={classes.applicationDesc}>
            We will call you within 1 business day and aim to provide account details within 3 days
          </p>
        </div>
        <div className={classes.horizontalLine}></div>
      </div>
    </>
  );
};
