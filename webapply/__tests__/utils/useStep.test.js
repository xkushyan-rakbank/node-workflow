import React from "react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { Formik } from "formik";
import { render } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";

import { getCompletedSteps } from "../../src/store/selectors/completedSteps";
import { setInitialSteps, setStepStatus } from "../../src/store/actions/completedSteps";
import { useStep } from "../../src/utils/useStep";
import { STEP_STATUS } from "../../src/constants";
import { FormikEffect } from "../../src/components/Form/FormikEffect";

jest.mock("../../src/store/selectors/completedSteps");
jest.mock("../../src/store/actions/completedSteps");
jest.mock("../../src/components/Form/FormikEffect", () => ({
  FormikEffect: jest.fn().mockImplementation(() => null)
}));

describe("useStep tests", () => {
  const mockStore = configureStore([thunk]);
  const store = mockStore({});
  const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

  const setInitialStepsAction = { type: "setInitialSteps" };
  const setStepStatusAction = { type: "setStepStatus" };

  const flowId = "some flowId";
  const step1 = { flowId, step: 1, status: STEP_STATUS.COMPLETED };
  const step2 = { flowId, step: 2, status: STEP_STATUS.AVAILABLE };
  const step3 = { flowId, step: 3, status: STEP_STATUS.NOT_AVAILABLE };
  const steps = [step1, step2, step3];
  const completedSteps = [step1, step2, step3];

  setInitialSteps.mockReturnValue(setInitialStepsAction);
  setStepStatus.mockReturnValue(setStepStatusAction);

  beforeEach(() => {
    store.clearActions();
    getCompletedSteps.mockReturnValue(completedSteps);
    jest.clearAllMocks();
  });

  it("should dispatch setInitialSteps and return initial values", () => {
    const completedSteps = [];
    getCompletedSteps.mockReturnValue(completedSteps);

    const { result } = renderHook(() => useStep(flowId, steps), {
      wrapper
    });

    expect(store.getActions()).toEqual([setInitialStepsAction]);
    expect(result.current[0]).toEqual(step1.step);
    expect(result.current[1]).toEqual(completedSteps);
  });

  it("should return new available steps", () => {
    const { result } = renderHook(() => useStep(flowId, steps), {
      wrapper
    });

    expect(result.current[1]).toEqual(completedSteps);
  });

  it("should setActiveStep on handleSetNextStep with next value", () => {
    const { result } = renderHook(() => useStep(flowId, steps), {
      wrapper
    });

    act(() => {
      result.current[3](step2.step);
    });

    expect(result.current[0]).toEqual(step3.step);
    expect(store.getActions()).toEqual([setStepStatusAction]);
  });

  it("should setActiveStep on handleSetNextStep with null", () => {
    const { result } = renderHook(() => useStep(flowId, steps), {
      wrapper
    });

    act(() => {
      result.current[3](step3.step);
    });

    expect(result.current[0]).toEqual(null);
    expect(store.getActions()).toEqual([setStepStatusAction]);
  });

  it("should setActiveStep on handleSetStep", () => {
    const { result } = renderHook(() => useStep(flowId, steps), {
      wrapper
    });

    act(() => {
      result.current[2](step2.step);
    });

    expect(result.current[0]).toEqual(step2.step);
  });

  it("should not setActiveStep on handleSetStep", () => {
    const { result } = renderHook(() => useStep(flowId, steps), {
      wrapper
    });

    act(() => {
      result.current[2](step3.step);
    });

    expect(result.current[0]).toEqual(step1.step);
  });

  it("should createFormChangeHandler and handle it when no values changed", () => {
    const { result } = renderHook(() => useStep(flowId, steps), {
      wrapper
    });

    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        {result.current[4](() => null)}
      </Formik>
    );

    expect(FormikEffect).toHaveBeenCalled();

    act(() => {
      FormikEffect.mock.calls[0][0].onChange({
        values: {}
      });
    });

    expect(store.getActions()).toEqual([]);
  });

  it("should createFormChangeHandler and handle it with setStepStatus action", () => {
    const key = "some key";
    const value = "some value";
    const { result } = renderHook(() => useStep(flowId, steps), {
      wrapper
    });

    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        {result.current[4](() => null)}
      </Formik>
    );

    expect(FormikEffect).toHaveBeenCalled();

    act(() => {
      FormikEffect.mock.calls[0][0].onChange(
        { values: { [key]: value }, touched: { [key]: true } },
        { values: { [key]: "another value" } }
      );
    });

    expect(store.getActions()).toEqual([setStepStatusAction]);
  });

  it("should createFormChangeHandler and handle it without setStepStatus action", () => {
    const completedSteps = [{ flowId }];
    getCompletedSteps.mockReturnValue(completedSteps);
    const key = "some key";
    const value = "some value";
    const { result } = renderHook(() => useStep(flowId, steps), {
      wrapper
    });

    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        {result.current[4](() => null)}
      </Formik>
    );

    expect(FormikEffect).toHaveBeenCalled();

    act(() => {
      FormikEffect.mock.calls[0][0].onChange(
        { values: { [key]: value }, touched: { [key]: true } },
        { values: { [key]: "another value" } }
      );
    });

    expect(store.getActions()).toEqual([]);
  });
});
