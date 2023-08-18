import React from "react";
import { useSelector } from "react-redux";

import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
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
import { useLayoutParams } from "../FormLayout";
import { useViewId } from "../../utils/useViewId";

export const CongratulationsScreen = () => {
  useFormNavigation([true, true, formStepper]);
  useLayoutParams(false, false, false);
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
      <img src={submitted} alt="checked" className={classes.congratulationIcon} />
      <div className={classes.congratulationsTextWrapper}>
        <SectionTitleWithInfo
          title={"Thank you!"}
          info={`You've successfully submitted your ${accountTypeLabel} account application.`}
          smallInfo
        />
        <div className={classes.applicationDetailWrapper}>
          <div>
            <p className={classes.applicationNumber}>{prospectId}</p>
            <p className={classes.applicationDesc}>Your application reference number </p>
          </div>
          <DisclaimerNote
            className={classes.infoWrapper}
            text={
              "You'll need this reference number if you contact Customer Care about your application."
            }
            customIcon={<Icon name={ICONS.info} className={classes.infoIcon} alt="infoIcon" />}
          />
        </div>

        <div>
          <p className={classes.applicationNumber}>Here’s what happens next...</p>
          <p className={classes.applicationDesc}>
            Leave the rest to us! We'll be in touch soon to finalise your application.
          </p>
        </div>

        <ContainedButton
          withRightArrow
          justifyContent="flex-start"
          label="Track my application"
          className={classes.trackApplicationBtn}
          handleClick={() => navigateToDashboard()}
        />
      </div>
    </>
  );
};
