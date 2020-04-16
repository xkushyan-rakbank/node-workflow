import React from "react";
import { render, act } from "@testing-library/react";

import { SuccessFilledStakeholder } from "../../../src/containers/CompanyStakeholders/components/SuccessFilledStakeholder/SuccessFilledStakeholder";
import { FilledStakeholderCard } from "../../../src/containers/CompanyStakeholders/FilledStakeholderCard";
import { CompanyStakeholderCard } from "../../../src/containers/CompanyStakeholders/CompanyStakeholderCard";
import { StepComponent } from "../../../src/containers/CompanyStakeholders/components/StepComponent/StepComponent";
import {
  COMPANY_STAKEHOLDER_ID,
  stakeHoldersSteps,
  STEP_1,
  STEP_2,
  STEP_6
} from "../../../src/containers/CompanyStakeholders/constants";
import { StakeholderStepperContainer } from "../../../src/containers/CompanyStakeholders/StakeholderStepper/StakeholderStepper";
import { CONTINUE, SAVE, STEP_STATUS } from "../../../src/constants";
import { GA_EVENTS } from "../../../src/utils/ga";
import { useStep } from "../../../src/utils/useStep";

jest.mock("../../../src/utils/useStep");
jest.mock(
  "../../../src/containers/CompanyStakeholders/components/SuccessFilledStakeholder/SuccessFilledStakeholder"
);
jest.mock("../../../src/containers/CompanyStakeholders/FilledStakeholderCard");
jest.mock("../../../src/containers/CompanyStakeholders/CompanyStakeholderCard");
jest.mock("../../../src/containers/CompanyStakeholders/components/StepComponent/StepComponent");

describe("StakeholderStepper container tests", () => {
  const stakeholderId = "some id";
  const fullName = "some full name";
  const kycDetails = "some details";
  const accountSigningInfo = "some info";
  const stakeholder = {
    id: stakeholderId,
    fullName,
    kycDetails,
    accountSigningInfo
  };
  const orderIndex = "some index";
  const deleteStakeholder = jest.fn();
  const sendProspectToAPI = jest.fn();
  const changeEditableStakeholder = jest.fn();

  const props = {
    stakeholder,
    orderIndex,
    deleteStakeholder,
    sendProspectToAPI,
    changeEditableStakeholder,
    editableStakeholder: stakeholderId
  };

  const activeStep = STEP_1,
    availableSteps = [
      { step: STEP_1, status: STEP_STATUS.COMPLETED },
      { step: STEP_2, status: STEP_STATUS.NOT_AVAILABLE }
    ],
    handleSetStep = jest.fn(),
    handleSetNextStep = jest.fn(),
    createFormChangeHandler = jest.fn();

  SuccessFilledStakeholder.mockImplementation(() => null);
  FilledStakeholderCard.mockImplementation(() => null);
  CompanyStakeholderCard.mockImplementation(({ children }) => children);
  StepComponent.mockImplementation(() => null);

  beforeEach(() => {
    useStep.mockReturnValue([
      activeStep,
      availableSteps,
      handleSetStep,
      handleSetNextStep,
      createFormChangeHandler
    ]);
    sendProspectToAPI.mockImplementation(() => Promise.resolve());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call useStep", () => {
    render(<StakeholderStepperContainer {...props} />);

    expect(useStep).toHaveBeenCalledWith(
      `${COMPANY_STAKEHOLDER_ID}${stakeholderId}`,
      stakeHoldersSteps
    );
  });

  it("should render CompanyStakeholderCard if edit is in progress", () => {
    render(<StakeholderStepperContainer {...props} />);

    expect(CompanyStakeholderCard).toHaveBeenCalled();
    expect(CompanyStakeholderCard.mock.calls[0][0]).toMatchObject({
      index: orderIndex,
      stakeholderId,
      isDisplayConfirmation: false
    });
  });

  it("should call changeEditableStakeholder on cancel click", () => {
    render(<StakeholderStepperContainer {...props} />);

    CompanyStakeholderCard.mock.calls[0][0].cancelEditHandler();

    expect(changeEditableStakeholder).toHaveBeenCalledWith(null);
  });

  it("should display confirmation on first click and delete on second", () => {
    render(<StakeholderStepperContainer {...props} />);

    act(() => {
      CompanyStakeholderCard.mock.calls[0][0].deleteHandler();
    });

    expect(CompanyStakeholderCard.mock.calls[1][0].isDisplayConfirmation).toBe(true);

    act(() => {
      CompanyStakeholderCard.mock.calls[1][0].deleteHandler();
    });

    expect(CompanyStakeholderCard.mock.calls[2][0].isDisplayConfirmation).toBe(false);
    expect(deleteStakeholder).toHaveBeenCalledWith(stakeholderId);
  });

  it("should render all steps", () => {
    render(<StakeholderStepperContainer {...props} />);

    expect(StepComponent).toHaveBeenCalledTimes(6);
    expect(StepComponent.mock.calls[0][0].isFilled).toBe(true);
    expect(StepComponent.mock.calls[1][0].isFilled).toBe(false);
  });

  it("should render FilledStakeholderCard if edit is not in progress", () => {
    render(<StakeholderStepperContainer {...props} editableStakeholder={null} />);

    expect(FilledStakeholderCard).toHaveBeenCalled();
    expect(FilledStakeholderCard.mock.calls[0][0]).toEqual({
      accountSigningInfo,
      index: orderIndex,
      kycDetails,
      isEditDisabled: false,
      stakeholderId
    });
  });

  it("should set next step", async () => {
    render(<StakeholderStepperContainer {...props} />);

    await StepComponent.mock.calls[0][0].handleContinue();

    expect(sendProspectToAPI).toHaveBeenCalledWith(
      CONTINUE,
      GA_EVENTS.COMPANY_STAKEHOLDER_PERSONAL_INFORMATION_CONTINUE,
      SAVE,
      { activeStep, flowId: `${COMPANY_STAKEHOLDER_ID}${stakeholderId}` }
    );

    expect(handleSetNextStep).toHaveBeenCalledWith(activeStep);
  });

  it("should send prospect to API when active step is last.", async () => {
    jest.useFakeTimers();
    const activeStep = STEP_6;
    useStep.mockReturnValue([
      activeStep,
      availableSteps,
      handleSetStep,
      handleSetNextStep,
      createFormChangeHandler
    ]);
    render(<StakeholderStepperContainer {...props} />);

    await act(async () => await StepComponent.mock.calls[0][0].handleContinue());

    expect(sendProspectToAPI).toHaveBeenCalledWith(
      CONTINUE,
      GA_EVENTS.COMPANY_STAKEHOLDER_PERSONAL_INFORMATION_CONTINUE,
      SAVE,
      { activeStep, flowId: `${COMPANY_STAKEHOLDER_ID}${stakeholderId}` }
    );

    expect(SuccessFilledStakeholder).toHaveBeenCalledTimes(1);
    expect(SuccessFilledStakeholder.mock.calls[0][0]).toEqual({ name: fullName });
    expect(handleSetNextStep).toHaveBeenCalledWith(activeStep);
    expect(changeEditableStakeholder).not.toBeCalled();
    act(() => {
      jest.runAllTimers();
    });
    expect(SuccessFilledStakeholder).toHaveBeenCalledTimes(1);
    expect(changeEditableStakeholder).toHaveBeenCalledWith(null);
  });

  it("should do nothing when sendProspectToAPI was rejected", async () => {
    sendProspectToAPI.mockImplementation(() => Promise.reject());
    render(<StakeholderStepperContainer {...props} />);

    await StepComponent.mock.calls[0][0].handleContinue();

    expect(sendProspectToAPI).toHaveBeenCalledWith(
      CONTINUE,
      GA_EVENTS.COMPANY_STAKEHOLDER_PERSONAL_INFORMATION_CONTINUE,
      SAVE,
      { activeStep, flowId: `${COMPANY_STAKEHOLDER_ID}${stakeholderId}` }
    );

    expect(handleSetNextStep).not.toHaveBeenCalled();
  });

  it("should handle set step", () => {
    render(<StakeholderStepperContainer {...props} />);
    StepComponent.mock.calls[0][0].clickHandler();

    expect(handleSetStep).toHaveBeenCalledWith(STEP_1);
  });
});
