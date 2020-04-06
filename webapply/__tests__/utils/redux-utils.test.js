import { handleActions, composeActions, decomposeActions } from "../../src/utils/redux-utils";

describe("redux utils test", () => {
  it("should return composed actions", () => {
    expect(composeActions("ACTION_1", "ACTION_2")).toEqual("ACTION_1,ACTION_2");
  });

  it("should return decomposed actions", () => {
    expect(decomposeActions("ACTION_1,ACTION_2")).toEqual(["ACTION_1", "ACTION_2"]);
  });

  it("should return reducer function", () => {
    expect(typeof handleActions({}, {})).toBe("function");
  });

  it("should return default state when reducer function called with nonexistent action", () => {
    const ACTION_TYPE_1 = "ACTION_TYPE_1";
    const ACTION_TYPE_2 = "ACTION_TYPE_2";
    const initialState = { status: "some value" };
    const reducer = handleActions(
      {
        [ACTION_TYPE_1]: (state, { payload }) => ({ ...state, status: payload })
      },
      initialState
    );
    expect(reducer(initialState, { type: ACTION_TYPE_2 })).toEqual(initialState);
  });

  it("should return new state when reducer function called", () => {
    const ACTION_TYPE_2 = "ACTION_TYPE_2";
    const initialState = { status: "some value" };
    const newState = { status: "new value" };

    const reducer = handleActions(
      {
        [ACTION_TYPE_2]: (state, { payload }) => ({ ...state, status: payload })
      },
      initialState
    );

    expect(reducer(initialState, { type: ACTION_TYPE_2, payload: "new value" })).toEqual(newState);
  });
});
