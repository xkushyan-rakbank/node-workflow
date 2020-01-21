import React from "react";
import get from "lodash/get";
import cx from "classnames";

import { FormCard } from "../../../../components/FormCard/FormCard";
import { LinkButton } from "../../../../components/Buttons/LinkButton";
import { FinalQuestionStepComponent } from "../FinalQuestionStepComponent";
import { useStyles } from "./styled";
import { signatoriesSteps, SIGNATORY_FIELD_NAME, STEP_1 } from "./constants";
import { checkIsAccountInfoTypeNumber } from "./utils";

export const SignatorySummaryCardComponent = ({
  sendProspectToAPI,
  index,
  signatory,
  uiConfig,
  signatory: { fullName } = {},
  expandedSignatoryIndex,
  setExpandedSignatoryIndex,
  handleFinalStepContinue,
  completedSignatoriesSteps
}) => {
  const isSignatoryStepsCompleted = completedSignatoriesSteps[index];
  const classes = useStyles();

  const percentage = parseInt(get(signatory, "kycDetails.shareHoldingPercentage", 0), 10);
  const authorityTypeValueFromProspect = get(signatory, "accountSigningInfo.authorityType");
  const { authorityTypeValue } = checkIsAccountInfoTypeNumber(
    authorityTypeValueFromProspect,
    uiConfig
  );

  return (
    <FormCard
      className={classes.card}
      firstName={signatory.firstName}
      lastName={signatory.lastName || signatory.fullName}
      content={
        <div className={classes.contentBox}>
          <div className={classes.infoBox}>
            <div className={classes.name}>{fullName}</div>
            <div className={classes.signatoryField}>{authorityTypeValue}</div>
            <div className={classes.shareholdingField}>
              {percentage > 0 ? `Shareholding ${percentage}%` : "No shareholding"}
            </div>
          </div>
          <div className={classes.controlsBox}>
            {expandedSignatoryIndex !== index && isSignatoryStepsCompleted && (
              <LinkButton
                clickHandler={() => {
                  setExpandedSignatoryIndex(index);
                }}
              />
            )}
          </div>
        </div>
      }
      index={index}
    >
      <div className={cx({ hidden: expandedSignatoryIndex !== index })}>
        <FinalQuestionStepComponent
          index={index}
          stepsArray={signatoriesSteps}
          handleFinalStepContinue={handleFinalStepContinue}
          sendProspectToAPI={sendProspectToAPI}
          fieldName={SIGNATORY_FIELD_NAME}
          initialStep={STEP_1}
        />
      </div>
    </FormCard>
  );
};
