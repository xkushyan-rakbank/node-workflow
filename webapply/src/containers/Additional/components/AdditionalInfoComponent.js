import React from "react";
import cx from "classnames";
import { Button } from "@material-ui/core";
import routes from "../../../routes";
import { SectionTitleWithInfo } from "../../../components/SectionTitleWithInfo";
import { ReactComponent as NavigationLeft } from "../../../assets/icons/blackNavigationLeftArrow.svg";
import { BackLink } from "../../../components/Buttons/BackLink";
import { NextStepButton } from "../../../components/Buttons/NextStepButton";
import { useStyles } from "./styled";

export default function AdditionalInfoComponent() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.section}>
        <SectionTitleWithInfo
          title={"Tell us about your business and stakeholders"}
          info="We just need some details about your business and the people involved"
          smallInfo
        />
        <div className={classes.btnContainer}>
          <div
            className={classes.additionalSelectionButton}
          >
            <div className={classes.buttonText}>
              <div className={classes.title}>Company information</div>
            </div>
            <div className={classes.buttonWrap}>
              <Button
                color="primary"
                variant="outlined"
                className={cx(classes.actionButton, classes.btnAdd)}
              >
                Add
              </Button>
              {/* <div className={classes.completedWrapper}>
                <SuccessIcon />
                <span>Completed</span>
              </div> */}
              <NavigationLeft key="navigationArrowLeft" alt="blackArrowLeft" />
            </div>
          </div>
        </div>
        <div className={classes.btnContainer}>
          <div className={classes.additionalSelectionButton}>
            <div className={classes.buttonText}>
              <div className={classes.title}>Stakeholder information</div>
            </div>
            <div className={classes.buttonWrap}>
              <Button
                color="primary"
                variant="outlined"
                className={cx(classes.actionButton, classes.btnAdd)}
              >
                Add
              </Button>
              <NavigationLeft key="navigationArrowLeft" alt="blackArrowLeft" />
            </div>
          </div>
        </div>
      </div>
      <div className="linkContainer">
        <BackLink path={routes.StakeholderTermsAndConditions} />
        <NextStepButton label="Next" justify="flex-end" disabled={false} />
      </div>
    </div>
  );
}
