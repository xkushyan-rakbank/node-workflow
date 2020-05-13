import React from "react";
import { render, act } from "@testing-library/react";

import { CompanyStakeholdersContainer } from "../../../src/containers/CompanyStakeholders/CompanyStakeholders";
import { CompanyStakeholdersComponent } from "../../../src/containers/CompanyStakeholders/components/CompanyStakeholders/CompanyStakeholders";

import { useFormNavigation } from "../../../src/components/FormNavigation/FormNavigationProvider";
import { useViewId } from "../../../src/utils/useViewId";
import { useTrackingHistory } from "../../../src/utils/useTrackingHistory";
import { StakeholdersNameManager } from "../../../src/containers/CompanyStakeholders/components/StakeholdersNameProvider/StakeholdersNameProvider";
import { NEXT, formStepper } from "../../../src/constants";

jest.mock("../../../src/components/FormNavigation/FormNavigationProvider");
jest.mock(
  "../../../src/containers/CompanyStakeholders/components/CompanyStakeholders/CompanyStakeholders",
  () => ({ CompanyStakeholdersComponent: jest.fn().mockImplementation(() => null) })
);
jest.mock("../../../src/utils/useTrackingHistory");
jest.mock("../../../src/utils/useViewId");
jest.mock(
  "../../../src/containers/CompanyStakeholders/components/StakeholdersNameProvider/StakeholdersNameProvider",
  () => ({
    StakeholdersNameProvider: ({ children }) => children,
    StakeholdersNameManager: {
      setStakeholderFullNames: jest.fn(),
      deleteStakeholderFullName: jest.fn()
    }
  })
);

describe("CompanyStakeholders container tests", () => {
  const pushHistory = jest.fn();

  const deleteStakeholder = jest.fn();
  const changeEditableStakeholder = jest.fn();
  const createNewStakeholder = jest.fn();
  const sendProspectToAPI = jest.fn();
  const stakeholder = "some stakeholder";
  const stakeholders = [stakeholder];
  const percentage = 100;
  const hasSignatories = true;
  const isAllStakeholdersStepsCompleted = true;
  const isAnyStakeholderStepsCompleted = true;
  const isSendingProspect = false;
  const editableStakeholder = "some id";
  const stakeholderSteps = [stakeholder];
  const setStepStatusUpdate = jest.fn();

  const props = {
    deleteStakeholder,
    changeEditableStakeholder,
    createNewStakeholder,
    sendProspectToAPI,
    stakeholders,
    percentage,
    editableStakeholder,
    hasSignatories,
    isAllStakeholdersStepsCompleted,
    isAnyStakeholderStepsCompleted,
    isSendingProspect,
    setStepStatusUpdate,
    stakeholderSteps
  };

  beforeEach(() => {
    useFormNavigation.mockImplementation(() => {});
    useViewId.mockImplementation(() => {});
    useTrackingHistory.mockReturnValue(pushHistory);

    jest.clearAllMocks();
  });

  it("should pass default props to component", () => {
    render(<CompanyStakeholdersContainer {...props} />);

    expect(CompanyStakeholdersComponent).toHaveBeenCalledTimes(1);
    expect(CompanyStakeholdersComponent.mock.calls[0][0]).toMatchObject({
      stakeholders,
      isSendingProspect,
      percentage,
      isLoading: false,
      isDisableNextStep: false,
      isSignatoryErrorDisplayed: false,
      isLowPercentageErrorDisplayed: false
    });
  });

  it("should call `useFormNavigation` hook", () => {
    render(<CompanyStakeholdersContainer {...props} />);

    expect(useFormNavigation).toHaveBeenCalledWith([false, true, formStepper]);
  });

  it("should call `useViewId` hook", () => {
    render(<CompanyStakeholdersContainer {...props} />);

    expect(useViewId).toHaveBeenCalledWith(true);
  });

  it("should create new stakeholder is there is no stakeholders on mount", () => {
    render(<CompanyStakeholdersContainer {...props} stakeholders={[]} />);

    expect(createNewStakeholder).toHaveBeenCalled();
  });

  it("should not create new stakeholder is there is any stakeholders on mount", () => {
    render(<CompanyStakeholdersContainer {...props} />);

    expect(createNewStakeholder).toHaveBeenCalledTimes(0);
  });

  it("should not update status of steps if there is no stakeholders", () => {
    render(<CompanyStakeholdersContainer {...props} stakeholders={[]}/>);

    expect(setStepStatusUpdate).toHaveBeenCalledTimes(1);
  });

  it("should call StakeholdersNameManager", () => {
    render(<CompanyStakeholdersContainer {...props} />);

    expect(StakeholdersNameManager.setStakeholderFullNames.mock.calls[0]).toEqual([stakeholders]);
  });

  it("should show low percentage error", () => {
    render(<CompanyStakeholdersContainer {...props} percentage={97} />);

    expect(CompanyStakeholdersComponent).toHaveBeenCalledTimes(1);
    expect(CompanyStakeholdersComponent.mock.calls[0][0].isLowPercentageErrorDisplayed).toBe(true);
  });

  it("should go to final questions", async () => {
    sendProspectToAPI.mockImplementation(() => Promise.resolve(false));
    render(<CompanyStakeholdersContainer {...props} />);

    expect(CompanyStakeholdersComponent).toHaveBeenCalledTimes(1);

    await act(async () => {
      await CompanyStakeholdersComponent.mock.calls[0][0].goToFinalQuestions();
    });

    expect(CompanyStakeholdersComponent).toHaveBeenCalledTimes(2);
    expect(sendProspectToAPI).toHaveBeenCalled();
    expect(sendProspectToAPI.mock.calls[0]).toEqual([NEXT]);
    expect(CompanyStakeholdersComponent.mock.calls[0][0].isLoading).toBe(false);
    expect(CompanyStakeholdersComponent.mock.calls[1][0].isLoading).toBe(true);
    expect(pushHistory).toHaveBeenCalled();
  });

  it("should not go to final questions", async () => {
    sendProspectToAPI.mockImplementation(() => Promise.resolve(true));
    render(<CompanyStakeholdersContainer {...props} />);

    expect(CompanyStakeholdersComponent).toHaveBeenCalledTimes(1);

    await act(async () => {
      await CompanyStakeholdersComponent.mock.calls[0][0].goToFinalQuestions();
    });

    expect(CompanyStakeholdersComponent).toHaveBeenCalledTimes(2);
    expect(sendProspectToAPI).toHaveBeenCalled();
    expect(sendProspectToAPI.mock.calls[0]).toEqual([NEXT]);
    expect(CompanyStakeholdersComponent.mock.calls[0][0].isLoading).toBe(false);
    expect(CompanyStakeholdersComponent.mock.calls[1][0].isLoading).toBe(true);
    expect(pushHistory).toHaveBeenCalledTimes(0);
  });

  it("should not go to final questions", async () => {
    sendProspectToAPI.mockImplementation(() => Promise.reject());
    render(<CompanyStakeholdersContainer {...props} />);

    expect(CompanyStakeholdersComponent).toHaveBeenCalledTimes(1);

    await act(async () => {
      await CompanyStakeholdersComponent.mock.calls[0][0].goToFinalQuestions();
    });

    expect(CompanyStakeholdersComponent).toHaveBeenCalledTimes(3);
    expect(sendProspectToAPI).toHaveBeenCalled();
    expect(sendProspectToAPI.mock.calls[0]).toEqual([NEXT]);
    expect(CompanyStakeholdersComponent.mock.calls[0][0].isLoading).toBe(false);
    expect(CompanyStakeholdersComponent.mock.calls[1][0].isLoading).toBe(true);
    expect(CompanyStakeholdersComponent.mock.calls[2][0].isLoading).toBe(false);
    expect(pushHistory).toHaveBeenCalledTimes(0);
  });

  it("should delete stakeholder", () => {
    const id = "some id";
    render(<CompanyStakeholdersContainer {...props} />);

    CompanyStakeholdersComponent.mock.calls[0][0].handleDeleteStakeholder(id);

    expect(StakeholdersNameManager.deleteStakeholderFullName).toHaveBeenCalledWith(id);
    expect(changeEditableStakeholder).toHaveBeenCalledWith(null);
    expect(deleteStakeholder).toHaveBeenCalledWith(id);
  });

  it("should add new stakeholder", () => {
    render(<CompanyStakeholdersContainer {...props} />);

    CompanyStakeholdersComponent.mock.calls[0][0].addNewStakeholder();

    expect(createNewStakeholder).toHaveBeenCalled();
  });
});
