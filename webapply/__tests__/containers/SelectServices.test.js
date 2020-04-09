import React from "react";
import { Provider } from "react-redux";
import { render, act } from "@testing-library/react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { useTrackingHistory } from "../../src/utils/useTrackingHistory";
import { SelectServicesPage } from "../../src/containers/SelectServices/SelectServicesPage";
import { SelectServices } from "../../src/containers/SelectServices/components/SelectServices";
import { useStep } from "../../src/hooks/useStep";

jest.mock("../../src/containers/SelectServices/components/SelectServices");
jest.mock("../../src/utils/useTrackingHistory");
jest.mock("../../src/hooks/useStep");
jest.mock("../../src/containers/SelectServices/components/SelectServices");

describe("SelectServices tests", () => {
  const pushHistory = jest.fn();
  const activeStep = "some active step";
  const availableSteps = "some available step";
  const handleSetStep = jest.fn();
  const handleSetNextStep = jest.fn(() => Promise.resolve());
  const createFormChangeHandler = "some create handler";
  beforeAll(() => {
    useTrackingHistory.mockReturnValue(pushHistory);
    useStep.mockReturnValue([
      activeStep,
      availableSteps,
      handleSetStep,
      handleSetNextStep,
      createFormChangeHandler
    ]);
    SelectServices.mockImplementation(() => null);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should render", () => {
    render(<SelectServicesPage />);
    expect(SelectServices).toHaveBeenCalledTimes(1);
  });
});
