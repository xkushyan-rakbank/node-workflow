import reducer, { initialState } from "../../../src/store/reducers/completedSteps";
import { LOAD_META_DATA } from "../../../src/store/actions/appConfig";
import {
  SET_STEP_STATUS,
  SET_INITIAL_STEPS,
  REMOVE_SIGNATORY,
  SET_STEPS_STATUS
} from "../../../src/store/actions/completedSteps";
import { log } from "../../../src/utils/loggger";

jest.mock("../../../src/utils/loggger");

describe("completedSteps reducer test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should handle LOAD_META_DATA action type", () => {
    const completedSteps = ["1"];

    expect(
      reducer(undefined, {
        type: LOAD_META_DATA,
        payload: JSON.stringify({ completedSteps })
      })
    ).toStrictEqual(completedSteps);
  });

  it("should handle LOAD_META_DATA action type with when is loaded data is empty", () => {
    expect(reducer(undefined, { type: LOAD_META_DATA })).toStrictEqual(initialState);
  });

  it("should handle LOAD_META_DATA action type when is loaded data have bad json format", () => {
    log.mockReturnValue(null);
    expect(reducer(undefined, { type: LOAD_META_DATA, payload: "bad json" })).toStrictEqual(
      initialState
    );
    expect(log).toBeCalled();
  });

  it("should handle LOAD_META_DATA action type with no json", () => {
    expect(reducer(undefined, { type: LOAD_META_DATA })).toStrictEqual(initialState);
  });

  it("should handle SET_STEP_STATUS action type", () => {
    const step = { flowId: "test" };
    const status = "some status";

    expect(
      reducer([{ ...step, step: 0 }, { ...step, step: 1 }], {
        type: SET_STEP_STATUS,
        payload: { ...step, step: 0, status }
      })
    ).toStrictEqual([{ ...step, step: 0, status }, { ...step, step: 1 }]);
  });

  it("should handle SET_STEPS_STATUS action type", () => {
    const flowId = "some flowId";
    const initialState = [
      { flowId, step: 0, status: "some status 1" },
      { flowId, step: 1, status: "some status 2" }
    ];
    const steps = [{ flowId, step: 0 }, { flowId, step: 1 }];
    const status = "some status";
    const action = {
      type: SET_STEPS_STATUS,
      payload: { steps, status }
    };

    expect(reducer(initialState, action)).toStrictEqual([
      { flowId, step: 0, status },
      { flowId, step: 1, status }
    ]);
  });

  it("should handle SET_INITIAL_STEPS action type", () => {
    expect(reducer(["1"], { type: SET_INITIAL_STEPS, payload: { steps: ["2"] } })).toStrictEqual([
      "1",
      "2"
    ]);
  });

  it("should handle REMOVE_SIGNATORY action type", () => {
    expect(
      reducer([{ flowId: "some signatory 1" }], {
        type: REMOVE_SIGNATORY,
        payload: { signatoryId: "1" }
      })
    ).toStrictEqual([]);
  });
});
