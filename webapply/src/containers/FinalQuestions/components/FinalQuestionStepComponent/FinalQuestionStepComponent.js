import React, { useCallback } from "react";
import { StepComponent } from "../../../../components/StepComponent/StepComponent";
import { SIGNATORY_INITIAL_INDEX } from "../SignatorySummaryCard/constants";
import { useStep } from "../../../../utils/useStep";
import { CONTINUE, STEP_STATUS, SAVE } from "../../../../constants";

export const FinalQuestionStepComponent = ({
  index = null,
  sIndex,
  handleFinalStepContinue,
  sendProspectToAPI,
  stepsArray,
  page,
  ...rest
}) => {
  const [
    activeStep,
    availableSteps,
    handleSetStep,
    handleSetNextStep,
    createFormChangeHandler
  ] = useStep(page, stepsArray);

  const handleContinue = useCallback(
    eventName => () => {
      sendProspectToAPI(CONTINUE, eventName, SAVE, { activeStep, flowId: page }).then(
        () => {
          handleSetNextStep(activeStep);
          if (activeStep === stepsArray.length) {
            const completedIndex = index !== null ? index + 1 : SIGNATORY_INITIAL_INDEX;
            handleFinalStepContinue(completedIndex, index);
          }
        },
        () => {}
      );
    },
    [
      sendProspectToAPI,
      handleSetNextStep,
      index,
      stepsArray,
      handleFinalStepContinue,
      activeStep,
      page
    ]
  );

  const createSetStepHandler = nextStep => () => handleSetStep(nextStep);

  return stepsArray.map(item => (
    <StepComponent
      index={sIndex}
      page={page}
      key={item.step}
      steps={stepsArray}
      step={item.step}
      title={item.title}
      infoTitle={item.infoTitle}
      isActiveStep={activeStep === item.step}
      isFilled={availableSteps.some(
        step => step.step === item.step && step.status === STEP_STATUS.COMPLETED
      )}
      handleClick={createSetStepHandler(item.step)}
      handleContinue={handleContinue(item.eventName)}
      createFormChangeHandler={createFormChangeHandler}
      stepForm={item.component}
      {...rest}
    />
  ));
};
