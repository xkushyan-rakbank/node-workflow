import React from "react";
import { render, act } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import { FinalQuestionsPage } from "../../src/containers/FinalQuestions/FinalQuestionsPage";
import { FinalQuestions } from "../../src/containers/FinalQuestions/components/FinalQuestions";
import { useFormNavigation } from "../../src/components/FormNavigation/FormNavigationProvider";
import { getSignatoriesSteps, getCompanySteps } from "../../src/store/selectors/completedSteps";
import { useViewId } from "../../src/utils/useViewId";
import { checkAllStepsCompleted } from "../../src/utils/checkAllStepsCompleted";
import { useTrackingHistory } from "../../src/utils/useTrackingHistory";
import { formStepper } from "../../src/constants";
import routes from "../../src/routes";

jest.mock("../../src/containers/FinalQuestions/components/FinalQuestions");
jest.mock("../../src/store/selectors/completedSteps");
jest.mock("../../src/utils/checkAllStepsCompleted");
jest.mock("../../src/utils/useTrackingHistory");
jest.mock("../../src/components/FormNavigation/FormNavigationProvider");
jest.mock("../../src/utils/useViewId");

describe("FinalQuestions tests", () => {
  const signatories = "some signatories";
  const signatoriesSteps = "some signatories steps";
  const companySteps = "some company steps";
  const isCompanyStepsCompleted = "some bool";
  const state = "some state";
  let sendProspectToAPI = jest.fn();
  const pushHistory = jest.fn();

  const mockStore = configureStore();
  const store = mockStore(state);
  const TestComponent = (props = {}) => (
    <Provider store={store}>
      <FinalQuestionsPage
        signatories={signatories}
        sendProspectToAPI={sendProspectToAPI}
        {...props}
      />
    </Provider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
    useFormNavigation.mockReturnValue(null);
    useViewId.mockReturnValue(null);
    FinalQuestions.mockReturnValue(null);
    useTrackingHistory.mockReturnValue(pushHistory);
    getCompanySteps.mockReturnValue(companySteps);
    getSignatoriesSteps.mockReturnValue(signatoriesSteps);
    checkAllStepsCompleted.mockReturnValue(isCompanyStepsCompleted);
  });

  it("should render `FinalQuestion` component", () => {
    render(<TestComponent />);

    expect(FinalQuestions.mock.calls[0][0]).toMatchObject({
      signatories,
      signatoriesSteps,
      isLoading: false,
      isAllStepsCompleted: isCompanyStepsCompleted,
      isCompanyExpanded: false,
      isCompanyStepsCompleted,
      expandedSignatoryIndex: null
    });
  });

  it("should call `useViewId` hook", () => {
    render(<TestComponent />);

    expect(useViewId).toBeCalledWith(true);
  });

  it("should call `useFormNavigation` hook", () => {
    render(<TestComponent />);

    expect(useFormNavigation).toBeCalledWith([false, true, formStepper]);
  });

  it("should call `getCompanySteps` selector", () => {
    render(<TestComponent />);

    expect(getCompanySteps).toBeCalledWith(state);
  });

  it("should call `getSignatoriesSteps` selector", () => {
    render(<TestComponent />);

    expect(getSignatoriesSteps).toBeCalledWith(state);
  });

  it("should call `checkAllStepsCompleted`", () => {
    render(<TestComponent />);

    expect(checkAllStepsCompleted.mock.calls[0][0]).toBe(companySteps);
    expect(checkAllStepsCompleted.mock.calls[1][0]).toBe(signatoriesSteps);
  });

  it("should set company expanded when click on `Start here` button", () => {
    render(<TestComponent />);

    act(() => FinalQuestions.mock.calls[0][0].handleClickStartHere());

    expect(FinalQuestions.mock.calls[1][0]).toMatchObject({
      isCompanyExpanded: true
    });
  });

  it("should set expanded signatory index on final step continue button", () => {
    const expandedSignatoryIndex = "some index";

    render(<TestComponent />);

    act(() => FinalQuestions.mock.calls[0][0].handleFinalStepContinue(expandedSignatoryIndex));

    expect(FinalQuestions.mock.calls[1][0]).toMatchObject({
      isCompanyExpanded: false,
      expandedSignatoryIndex
    });
  });

  it("should replace location when user submit the form", async () => {
    sendProspectToAPI = jest.fn(() => Promise.resolve(false));

    render(<TestComponent sendProspectToAPI={sendProspectToAPI} />);

    await act(async () => {
      await FinalQuestions.mock.calls[0][0].goToUploadDocument();
    });

    expect(pushHistory).toBeCalledWith(routes.uploadDocuments, true);
    expect(FinalQuestions.mock.calls[1][0].isLoading).toBe(true);
  });

  it("should do nothing when throw screning error", async () => {
    sendProspectToAPI = jest.fn(() => Promise.resolve(true));

    render(<TestComponent sendProspectToAPI={sendProspectToAPI} />);

    await act(async () => {
      await FinalQuestions.mock.calls[0][0].goToUploadDocument();
    });

    expect(pushHistory).not.toBeCalled();
    expect(FinalQuestions.mock.calls[1][0].isLoading).toBe(true);
  });

  it("should do nothing when send prospect was failed", async () => {
    sendProspectToAPI = jest.fn(() => Promise.reject());

    render(<TestComponent sendProspectToAPI={sendProspectToAPI} />);

    await act(async () => {
      await FinalQuestions.mock.calls[0][0].goToUploadDocument();
    });

    expect(pushHistory).not.toBeCalled();
    expect(FinalQuestions.mock.calls[1][0].isLoading).toBe(true);
    expect(FinalQuestions.mock.calls[2][0].isLoading).toBe(false);
  });
});
