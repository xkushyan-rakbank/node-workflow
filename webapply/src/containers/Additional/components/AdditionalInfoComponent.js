import React from "react";
import cx from "classnames";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import routes from "../../../routes";
import { SectionTitleWithInfo } from "../../../components/SectionTitleWithInfo";
import { ReactComponent as NavigationLeft } from "../../../assets/icons/blackNavigationLeftArrow.svg";
import { BackLink } from "../../../components/Buttons/BackLink";
import { NextStepButton } from "../../../components/Buttons/NextStepButton";
import { useStyles } from "./styled";
import { useTrackingHistory } from "../../../utils/useTrackingHistory";
import { ReactComponent as SuccessIcon } from "../../../assets/icons/credit_score.svg";
import { ReactComponent as ErrorIcon } from "../../../assets/icons/credit_score_error.svg";

const AdditionalInfoButton = ({ status, onClick, disabled }) => {
  const classes = useStyles();
  console.log("status", status);

  const getStatusText = () => {
    if (status === "inProgress") {
      return "Incomplete";
    } else if (status === "completed") {
      return "Completed";
    } else {
      return "";
    }
  };

  return (
    <div className={cx(classes.additionalSelectionButton, classes.additionalbtnSelected)}>
      <div className={classes.buttonText}>
        <div className={classes.title}>Company information</div>
      </div>
      <div className={classes.buttonWrap}>
        {!status ? (
          <Button
            color="primary"
            variant="outlined"
            className={cx(classes.actionButton, classes.btnAdd)}
            onClick={onClick}
            disabled={disabled}
          >
            Add
          </Button>
        ) : (
          <div
            className={cx(
              classes.completedWrapper,
              status === "inProgress" ? classes.incompleted : classes.success
            )}
          >
            {status === "inProgress" ? <ErrorIcon /> : <SuccessIcon />}
            <span>{getStatusText()}</span>
          </div>
        )}

        <NavigationLeft key="navigationArrowLeft" alt="blackArrowLeft" />
      </div>
    </div>
  );
};

export default function AdditionalInfoComponent() {
  const classes = useStyles();
  const pushHistory = useTrackingHistory();
  const navigateTo = path => {
    pushHistory(path);
  };

  const { companyAdditionalInfoStatus, addionalStakeholderInfoStatus } = useSelector(
    state => state.additionalInfo
  );

  const isNextButtonEnabled =
    companyAdditionalInfoStatus === "completed" && addionalStakeholderInfoStatus === "completed";

  const isStakeholderEnabled = companyAdditionalInfoStatus === "completed";

  return (
    <div className={classes.container}>
      <div className={classes.section}>
        <SectionTitleWithInfo
          title={"Tell us about your business and stakeholders"}
          info="We just need some details about your business and the people involved"
          smallInfo
        />
        <div
          className={classes.btnContainer}
          onClick={() => navigateTo(routes.additionalCompanyInformation)}
        >
          <AdditionalInfoButton
            status={companyAdditionalInfoStatus}
            onClick={() => navigateTo(routes.additionalCompanyInformation)}
            disabled={false}
          />
        </div>
        <div
          className={classes.btnContainer}
          onClick={() =>
            isStakeholderEnabled && navigateTo(routes.additionalStakeholderInformation)
          }
        >
          <AdditionalInfoButton
            status={addionalStakeholderInfoStatus}
            onClick={() => navigateTo(routes.additionalStakeholderInformation)}
            disabled={!isStakeholderEnabled}
          />
        </div>
      </div>
      <div className="linkContainer">
        <BackLink path={routes.StakeholderTermsAndConditions} />
        <NextStepButton label="Next" justify="flex-end" disabled={!isNextButtonEnabled} />
      </div>
    </div>
  );
}
