import React from "react";
import { useSelector } from "react-redux";
import get from "lodash/get";
import cx from "classnames";

import { FormCard } from "../../../../components/FormCard/FormCard";
import { LinkButton } from "../../../../components/Buttons/LinkButton";
import { FinalQuestionStepComponent } from "../FinalQuestionStepComponent";
import { useStyles } from "./styled";
import { signatoriesSteps } from "./steps";
import { getStakeholdersIds } from "../../../../store/selectors/stakeholders";
import { checkAllStepsCompleted } from "../../../../utils/checkAllStepsCompleted";
import { COMPANY_SIGNATORY_ID } from "../../../../constants";
import { createGetAuthorityTypeDisplayText } from "../../../../store/selectors/appConfig";

export const SignatorySummaryCardComponent = ({
  sendProspectToAPI,
  index,
  sIndex,
  signatory,
  signatory: { fullName } = {},
  expandedSignatoryIndex,
  setExpandedSignatoryIndex,
  handleFinalStepContinue,
  allSignatoriesSteps
}) => {
  const stakeholdersIds = useSelector(getStakeholdersIds);
  const authorityTypeValue = useSelector(
    createGetAuthorityTypeDisplayText(get(signatory, "accountSigningInfo.authorityType"))
  );
  const completedSteps = allSignatoriesSteps.filter(
    item => item.flowId.slice(COMPANY_SIGNATORY_ID.length) === stakeholdersIds[index]
  );
  const isAllStepsCompleted = checkAllStepsCompleted(completedSteps);
  const classes = useStyles();

  const percentage = Number(get(signatory, "kycDetails.shareHoldingPercentage", 0));

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
            {expandedSignatoryIndex !== index && isAllStepsCompleted && (
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
          sIndex={sIndex}
          stepsArray={signatoriesSteps}
          handleFinalStepContinue={handleFinalStepContinue}
          sendProspectToAPI={sendProspectToAPI}
          page={`${COMPANY_SIGNATORY_ID}${stakeholdersIds[index]}`}
          isSignatory={get(signatory, "kycDetails.isSignatory", false)}
        />
      </div>
    </FormCard>
  );
};
