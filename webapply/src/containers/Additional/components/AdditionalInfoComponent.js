import React from "react";
import cx from "classnames";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

import routes from "../../../routes";
import { SectionTitleWithInfo } from "../../../components/SectionTitleWithInfo";
import { ReactComponent as NavigationLeft } from "../../../assets/icons/blackNavigationLeftArrow.svg";
import { BackLink } from "../../../components/Buttons/BackLink";
import { NextStepButton } from "../../../components/Buttons/NextStepButton";
import { useStyles } from "./styled";
import { useTrackingHistory } from "../../../utils/useTrackingHistory";
import { ReactComponent as SuccessIcon } from "../../../assets/icons/credit_score.svg";
import { Footer } from "../../../components/Footer";
import { ContexualHelp } from "../../../components/Notifications";
import { getAccordionStatuses } from "../../../store/selectors/appConfig";

const AdditionalInfoButton = ({ status, onClick, disabled, text, showHelper, helperText }) => {
  const classes = useStyles();

  const getStatusText = () => {
    if (status === "In Progress") {
      return "Up next";
    } else if (status === "completed") {
      return "Completed";
    } else {
      return "";
    }
  };

  return (
    <div className={cx(classes.additionalSelectionButton, classes.additionalbtnSelected)}>
      <div className={classes.buttonText}>
        <div className={classes.sectionContainer}>
          <div className={classes.title}>{text}</div>
          {showHelper && (
            <ContexualHelp title={helperText} placement="right" isDisableHoverListener={false}>
              <HelpOutlineIcon className={classes.helperIcon} />
            </ContexualHelp>
          )}
        </div>
        {helperText && (
          <div className={classes.descritionContainer}>
            {" "}
            <p className={classes.description}>{helperText}</p>
          </div>
        )}
      </div>
      <div className={classes.buttonWrap}>
        {!status ? (
          <Button
            color="primary"
            className={cx(classes.actionButton, classes.btnAdd)}
            onClick={onClick}
            disabled={disabled}
          >
            {disabled === true ? "Up next" : "Start"}
          </Button>
        ) : (
          <div
            className={cx(
              classes.completedWrapper,
              status === "In progress" ? classes.incompleted : classes.success
            )}
          >
            {status === "completed" ? <SuccessIcon /> : null}
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
  const accordionStatuses = useSelector(getAccordionStatuses);
  const statuses = JSON.parse(accordionStatuses);
  const { companyAdditionalInfoStatus, addionalStakeholderInfoStatus } = statuses;

  const isNextButtonEnabled =
    companyAdditionalInfoStatus === "completed" && addionalStakeholderInfoStatus === "completed";

  const isStakeholderEnabled = companyAdditionalInfoStatus === "completed";

  const handleAdditionalInfoNextStep = () => {
    pushHistory(routes.accountServices);
  };

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
          <div>
            <AdditionalInfoButton
              status={companyAdditionalInfoStatus}
              onClick={() => navigateTo(routes.additionalCompanyInformation)}
              disabled={false}
              text="Company information"
              helperText="Details about your buyers and suppliers, financial turnover, addresses and tax declarations help us better understand your company and business needs."
            />
          </div>
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
            text="Stakeholder information"
            helperText="Stakeholders include proprietors, shareholders, partners, signatories and those who hold power of attorney. Information about your individual stakholders helps us better understand your company and business needs. Note that all sections are required."
          />
        </div>
      </div>
      <Footer>
        <BackLink path={routes.StakeholderTermsAndConditions} isTypeButton={true} />
        <NextStepButton
          label="Next"
          justify="flex-end"
          disabled={!isNextButtonEnabled}
          onClick={() => handleAdditionalInfoNextStep()}
        />
      </Footer>
    </div>
  );
}
