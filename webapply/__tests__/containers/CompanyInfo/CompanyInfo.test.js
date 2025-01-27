import React from "react";
import { render, act } from "@testing-library/react";

import { CompanyInfo } from "../../../src/containers/CompanyInfo/components/CompanyInfo";
import { CompanyInfoPage } from "../../../src/containers/CompanyInfo/CompanyInfoPage";
import { useLayoutParams } from "../../../src/containers/FormLayout";
import { useFormNavigation } from "../../../src/components/FormNavigation/FormNavigationProvider";
import { useTrackingHistory } from "../../../src/utils/useTrackingHistory";
import { useViewId } from "../../../src/utils/useViewId";
import { useStep } from "../../../src/utils/useStep";
import { checkAllStepsCompleted } from "../../../src/utils/checkAllStepsCompleted";
import { formStepper, CONTINUE, SAVE, NEXT } from "../../../src/constants";
import {
  companyInfoSteps,
  COMPANY_INFO_PAGE_ID
} from "../../../src/containers/CompanyInfo/constants";
import routes from "../../../src/routes";

jest.mock("../../../src/containers/CompanyInfo/components/CompanyInfo");
jest.mock("../../../src/containers/FormLayout");
jest.mock("../../../src/components/FormNavigation/FormNavigationProvider");
jest.mock("../../../src/utils/useTrackingHistory");
jest.mock("../../../src/utils/useStep");
jest.mock("../../../src/utils/checkAllStepsCompleted");
jest.mock("../../../src/utils/useViewId");

describe("CompanyInfo test", () => {
  const isSendingProspect = "some value";
  const fullName = "some name";
  const companyName = "some company name";
  const isComeFromROScreens = "some value";
  const baseProps = {
    isSendingProspect,
    fullName,
    companyName,
    isComeFromROScreens
  };

  const pushHistory = jest.fn();
  const activeStep = "some active step";
  const availableSteps = "some available step";
  const handleSetStep = jest.fn();
  const handleSetNextStep = jest.fn(() => Promise.resolve());
  const createFormChangeHandler = "some create handler";
  const isAllStepsCompleted = "some bool";
  const event = "some event";
  useLayoutParams.mockReturnValue(null);
  useFormNavigation.mockReturnValue(null);
  useViewId.mockReturnValue(null);
  CompanyInfo.mockReturnValue(null);
  useTrackingHistory.mockReturnValue(pushHistory);
  checkAllStepsCompleted.mockReturnValue(isAllStepsCompleted);
  useStep.mockReturnValue([
    activeStep,
    availableSteps,
    handleSetStep,
    handleSetNextStep,
    createFormChangeHandler
  ]);

  describe("When sendProspectToAPI resolved", () => {
    const sendProspectToAPI = jest.fn(() => Promise.resolve(false));
    const props = {
      ...baseProps,
      sendProspectToAPI
    };

    beforeAll(() => {
      jest.clearAllMocks();
      render(<CompanyInfoPage {...props} />);
    });

    it("should call `useFormNavigation` hook", () => {
      expect(useFormNavigation).toHaveBeenCalledWith([false, true, formStepper]);
    });

    it("should call `useViewId` hook", () => {
      expect(useViewId).toHaveBeenCalledWith(true);
    });

    it("should call `useTrackingHistory`", () => {
      expect(useTrackingHistory).toHaveBeenCalled();
    });

    it("should call `useStep`", () => {
      expect(useStep).toHaveBeenCalledWith(COMPANY_INFO_PAGE_ID, companyInfoSteps);
    });

    it("should render CompanyInfo", () => {
      expect(CompanyInfo.mock.calls[0][0]).toMatchObject({
        fullName,
        companyName,
        activeStep,
        availableSteps,
        isSendingProspect,
        isComeFromROScreens,
        isAllStepsCompleted,
        isLoading: false,
        createFormChangeHandler
      });
    });

    it("should set next step", async () => {
      await CompanyInfo.mock.calls[0][0].handleContinue(event)();

      expect(sendProspectToAPI).toHaveBeenCalledWith(CONTINUE, event, SAVE, {
        activeStep,
        flowId: COMPANY_INFO_PAGE_ID
      });
      expect(handleSetNextStep).toHaveBeenCalledWith(activeStep);
    });

    it("should set new step", async () => {
      const nextStep = "some step";

      CompanyInfo.mock.calls[0][0].createSetStepHandler(nextStep)();

      expect(handleSetStep).toHaveBeenCalledWith(nextStep);
    });
  });

  describe("When sendProspectToAPI resolved and click on next step button", () => {
    const sendProspectToAPI = jest.fn(() => Promise.resolve(false));
    const props = {
      ...baseProps,
      sendProspectToAPI
    };

    beforeAll(() => {
      jest.clearAllMocks();
    });

    it("should push history", async () => {
      render(<CompanyInfoPage {...props} />);

      await act(async () => {
        await CompanyInfo.mock.calls[0][0].handleClickNextStep();
      });

      expect(sendProspectToAPI).toHaveBeenCalledWith(NEXT);
      expect(pushHistory).toHaveBeenCalledWith(routes.stakeholdersInfo, true);
    });
  });

  describe("When sendProspectToAPI failed", () => {
    const sendProspectToAPI = jest.fn(() => Promise.reject());
    const props = {
      ...baseProps,
      sendProspectToAPI
    };

    beforeAll(() => {
      jest.clearAllMocks();
      render(<CompanyInfoPage {...props} />);
    });

    it("should not set next step", async () => {
      await CompanyInfo.mock.calls[0][0].handleContinue(event)();

      expect(sendProspectToAPI).toHaveBeenCalledWith(CONTINUE, event, SAVE, {
        activeStep,
        flowId: COMPANY_INFO_PAGE_ID
      });
      expect(handleSetNextStep).not.toHaveBeenCalled();
    });
  });

  describe("When sendProspectToAPI failed and click on next step button", () => {
    const sendProspectToAPI = jest.fn(() => Promise.reject());
    const props = {
      ...baseProps,
      sendProspectToAPI
    };

    beforeAll(() => {
      jest.clearAllMocks();
    });

    it("should not push history", async () => {
      render(<CompanyInfoPage {...props} />);

      await act(async () => {
        await CompanyInfo.mock.calls[0][0].handleClickNextStep();
      });

      expect(sendProspectToAPI).toHaveBeenCalledWith(NEXT);
      expect(pushHistory).not.toHaveBeenCalled();
    });
  });
});
