import React from "react";
import { render, act } from "@testing-library/react";

import { SelectServicesPage } from "../../src/containers/SelectServices/SelectServicesPage";
import { SelectServices } from "../../src/containers/SelectServices/components/SelectServices";
import { useTrackingHistory } from "../../src/utils/useTrackingHistory";
import { useStep } from "../../src/utils/useStep";
import { useFormNavigation } from "../../src/components/FormNavigation/FormNavigationProvider";
import { formStepper, CONTINUE, SAVE, NEXT, STEP_STATUS, accountNames } from "../../src/constants";
import {
  SELECT_SERVICES_PAGE_ID,
  servicesSteps,
  STEP_4
} from "../../src/containers/SelectServices/constants";
import routes from "../../src/routes";

jest.mock("../../src/containers/SelectServices/components/SelectServices");
jest.mock("../../src/utils/useTrackingHistory");
jest.mock("../../src/components/FormNavigation/FormNavigationProvider");
jest.mock("../../src/utils/useStep");

describe("SelectServices test", () => {
  const pushHistory = jest.fn();
  const activeStep = "some active step";
  const availableSteps = [];
  const handleSetStep = jest.fn();
  const handleSetNextStep = jest.fn(() => Promise.resolve());
  const createFormChangeHandler = "some create handler";
  const event = "some event";

  const accountType = "some account type";
  const rakValuePackage = "some rak value package";
  const baseProps = { accountType, rakValuePackage };

  SelectServices.mockReturnValue(null);
  useFormNavigation.mockReturnValue(null);
  useTrackingHistory.mockReturnValue(pushHistory);

  describe("When sendProspectToAPI resolved", () => {
    const sendProspectToAPI = jest.fn(() => Promise.resolve(false));
    const props = {
      ...baseProps,
      sendProspectToAPI
    };

    beforeAll(() => {
      jest.clearAllMocks();
      useStep.mockReturnValue([
        activeStep,
        availableSteps,
        handleSetStep,
        handleSetNextStep,
        createFormChangeHandler
      ]);
      render(<SelectServicesPage {...props} />);
    });

    it("should call `useFormNavigation`", () => {
      expect(useFormNavigation).toHaveBeenCalledWith([false, true, formStepper]);
    });

    it("should call `useTrackingHistory`", () => {
      expect(useTrackingHistory).toHaveBeenCalled();
    });

    it("should call `useStep`", () => {
      expect(useStep).toHaveBeenCalledWith(SELECT_SERVICES_PAGE_ID, servicesSteps);
    });

    it("should render SelectServices", () => {
      expect(SelectServices.mock.calls[0][0]).toMatchObject({
        activeStep,
        availableSteps,
        isSubmit: true,
        isNextButtonDisabled: false,
        createFormChangeHandler
      });
    });

    it("should set next step", async () => {
      await SelectServices.mock.calls[0][0].handleContinue(event);

      expect(sendProspectToAPI).toHaveBeenCalledWith(CONTINUE, event, SAVE, {
        activeStep,
        flowId: SELECT_SERVICES_PAGE_ID
      });
      expect(handleSetNextStep).toHaveBeenCalledWith(activeStep);
    });

    it("should set new step", async () => {
      const nextStep = "some step";

      SelectServices.mock.calls[0][0].createSetStepHandler(nextStep)();

      expect(handleSetStep).toHaveBeenCalledWith(nextStep);
    });
  });

  describe("When number of activeStep is 4", () => {
    const props = {
      ...baseProps,
      sendProspectToAPI: jest.fn()
    };

    beforeAll(() => {
      jest.clearAllMocks();
      useStep.mockReturnValue([
        STEP_4,
        availableSteps,
        handleSetStep,
        handleSetNextStep,
        createFormChangeHandler
      ]);
      render(<SelectServicesPage {...props} />);
    });

    it("should set next step", async () => {
      await act(async () => {
        await SelectServices.mock.calls[0][0].handleClickNextStep();
      });

      expect(handleSetNextStep).toHaveBeenCalledWith(STEP_4);
    });
  });

  describe("When sendProspectToAPI resolved and click on next step button and isScreeningError is false", () => {
    const sendProspectToAPI = jest.fn(() => Promise.resolve(false));
    const props = {
      ...baseProps,
      sendProspectToAPI
    };

    beforeAll(() => {
      jest.clearAllMocks();
      useStep.mockReturnValue([
        activeStep,
        availableSteps,
        handleSetStep,
        handleSetNextStep,
        createFormChangeHandler
      ]);
      render(<SelectServicesPage {...props} />);
    });

    it("should redirect to SubmitApplication", async () => {
      await act(async () => {
        await SelectServices.mock.calls[0][0].handleClickNextStep();
      });

      expect(sendProspectToAPI).toHaveBeenCalledWith(NEXT);
      expect(pushHistory).toHaveBeenCalledWith(routes.SubmitApplication, true);
    });
  });

  describe("When sendProspectToAPI resolved and click on next step button and isScreeningError is true", () => {
    const sendProspectToAPI = jest.fn(() => Promise.resolve(true));
    const props = {
      ...baseProps,
      sendProspectToAPI
    };

    beforeAll(() => {
      jest.clearAllMocks();
      useStep.mockReturnValue([
        activeStep,
        availableSteps,
        handleSetStep,
        handleSetNextStep,
        createFormChangeHandler
      ]);
      render(<SelectServicesPage {...props} />);
    });

    it("should do nothing", async () => {
      await act(async () => {
        await SelectServices.mock.calls[0][0].handleClickNextStep();
      });

      expect(sendProspectToAPI).toHaveBeenCalledWith(NEXT);
      expect(pushHistory).not.toHaveBeenCalled();
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
      useStep.mockReturnValue([
        activeStep,
        availableSteps,
        handleSetStep,
        handleSetNextStep,
        createFormChangeHandler
      ]);
      render(<SelectServicesPage {...props} />);
    });

    it("should not set next step", async () => {
      await SelectServices.mock.calls[0][0].handleContinue(event);

      expect(sendProspectToAPI).toHaveBeenCalledWith(CONTINUE, event, SAVE, {
        activeStep,
        flowId: SELECT_SERVICES_PAGE_ID
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
      useStep.mockReturnValue([
        activeStep,
        availableSteps,
        handleSetStep,
        handleSetNextStep,
        createFormChangeHandler
      ]);
      render(<SelectServicesPage {...props} />);
    });

    it("should not push history", async () => {
      await act(async () => {
        await SelectServices.mock.calls[0][0].handleClickNextStep();
      });

      expect(sendProspectToAPI).toHaveBeenCalledWith(NEXT);
      expect(pushHistory).not.toHaveBeenCalled();
    });
  });

  describe("When next button is disabled", () => {
    const sendProspectToAPI = jest.fn();

    beforeAll(() => {
      jest.clearAllMocks();
    });

    it("should disable a next button when all steps are not completed", () => {
      useStep.mockReturnValue([
        activeStep,
        [{ step: 1, status: STEP_STATUS.AVAILABLE }],
        handleSetStep,
        handleSetNextStep,
        createFormChangeHandler
      ]);

      const props = {
        ...baseProps,
        sendProspectToAPI
      };
      render(<SelectServicesPage {...props} />);
      expect(SelectServices.mock.calls[0][0].isNextButtonDisabled).toEqual(true);
    });

    it("should disable a next button when account type is RakStarter and package have not choosen", () => {
      useStep.mockReturnValue([
        activeStep,
        availableSteps,
        handleSetStep,
        handleSetNextStep,
        createFormChangeHandler
      ]);
      const props = {
        accountType: accountNames.starter,
        rakValuePackage: "",
        sendProspectToAPI
      };
      render(<SelectServicesPage {...props} />);
      expect(SelectServices.mock.calls[0][0].isNextButtonDisabled).toEqual(true);
    });
  });
});
