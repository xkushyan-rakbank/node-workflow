import React from "react";
import get from "lodash/get";
import cx from "classnames";

import { FormCard } from "../../../../components/FormCard/FormCard";
import { LinkButton } from "../../../../components/Buttons/LinkButton";
import { FinalQuestionStepComponent } from "../FinalQuestionStepComponent";
import { useStyles } from "./styled";
import { signatoriesSteps, STEP_1 } from "./constants";
import { checkIsAccountInfoTypeNumber } from "./utils";
import { COMPANY_SIGNATORY_ID } from "./constants";

export const SignatorySummaryCardComponent = ({
  sendProspectToAPI,
  index,
  signatory,
  datalist,
  signatory: { fullName } = {},
  expandedSignatoryIndex,
  setExpandedSignatoryIndex,
  handleFinalStepContinue,
  completedSignatoriesSteps
}) => {
  const completedSteps = completedSignatoriesSteps.find(
    item => parseInt(item.flowId.match(/\d+/)) === index
  ).steps;
  const classes = useStyles();

  const percentage = parseInt(get(signatory, "kycDetails.shareHoldingPercentage", 0), 10);
  const authorityTypeValueFromProspect = get(signatory, "accountSigningInfo.authorityType");
  const authorityTypeValue = checkIsAccountInfoTypeNumber(authorityTypeValueFromProspect, datalist);

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
            {expandedSignatoryIndex !== index &&
              completedSteps.length === signatoriesSteps.length &&
              !completedSteps.some(step => !step.isCompleted) && (
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
          page={`${COMPANY_SIGNATORY_ID}${index}`}
          initialStep={STEP_1}
        />
      </div>
    </FormCard>
  );
};
