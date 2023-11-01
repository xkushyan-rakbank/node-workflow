import React from "react";
import { useSelector } from "react-redux";

import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { formStepper } from "../../constants";
import { useStyles } from "./styled";
import { SectionTitleWithInfo } from "../../components/SectionTitleWithInfo";
import { ContainedButton } from "../../components/Buttons/ContainedButton";
import routes from "../../routes";
import { DisclaimerNote } from "../../components/InfoNote/DisclaimerNote";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import { getAccountType, getProspectId } from "../../store/selectors/appConfig";
import { useLayoutParams } from "../FormLayout";
import { useViewId } from "../../utils/useViewId";
import { ReactComponent as SubmittedForm } from "../../assets/icons/submittedForm.svg";
import { ReactComponent as Phone } from "../../assets/icons/pinkPhone.svg";
import { checkLoginStatus } from "../../store/selectors/loginSelector";

export const CongratulationsScreen = ({ TAT }) => {
  useFormNavigation([true, true, formStepper]);
  useLayoutParams(false, false, false);
  useViewId();

  const pushHistory = useTrackingHistory();

  const classes = useStyles();
  const prospectId = useSelector(getProspectId);
  const accountType = useSelector(getAccountType);
  const isAgent = useSelector(checkLoginStatus);

  const navigateToDashboard = () => {
    pushHistory(routes.MyApplications, true);
  };

  const navigateToSearch = () => {
    pushHistory(routes.searchProspect, true);
  };

  const accountTypeLabel = accountType === "Current Account" ? "Current" : accountType;
  const applicationDesc = `Leave the rest to us! We'll be in touch ${
    TAT >= 10 ? "with you" : `within ${TAT} business days`
  } to finalize your application.`;

  return (
    <>
      {/* <CongratsIcon className={classes.congratulationIcon} /> */}
      <div className={classes.congratulationsTextWrapper}>
        <SectionTitleWithInfo
          title={"Thank you!"}
          info={`You've successfully submitted your ${accountTypeLabel} account application.`}
          smallInfo
          className={classes.customHeaderTitle}
        />
        <div className={classes.applicationDetailWrapper}>
          <div className={classes.sectionComponet}>
            <SubmittedForm className={classes.icon} />
            <div>
              <p className={classes.applicationNumber}>{prospectId}</p>
              <p className={classes.applicationDesc}>Your application reference number </p>
            </div>
          </div>

          <DisclaimerNote
            className={classes.infoWrapper}
            text={
              "You'll need this reference number if you contact Customer Care about your application."
            }
          />
          <div className={classes.horizontalLine}></div>

          <div className={classes.sectionComponet}>
            <Phone className={classes.icon} />
            <div>
              <p className={classes.applicationNumber}>Here’s what happens next..</p>
              <p className={classes.applicationDesc}>{applicationDesc}</p>
            </div>
          </div>
        </div>

        <ContainedButton
          withRightArrow
          justifyContent="flex-start"
          label={isAgent ? "Back to search" : "Track my application"}
          className={classes.trackApplicationBtn}
          handleClick={() => (isAgent ? navigateToSearch() : navigateToDashboard())}
        />
      </div>
    </>
  );
};
