import { initialState } from "../applicantInfoForm";
import applicantInfoFormReducer from "../applicantInfoForm";

import { applicantInfoFormSuccess, applicantInfoFormFail } from "../../actions/applicantInfoForm";

describe("advance-against-salary-reducer", () => {
  afterEach(jest.resetAllMocks);

  describe("initialState", () => {
    it("should initialise initialState as the value", () => {
      const { loading } = initialState;
      expect(loading).toBe(false);
    });
  });

  describe("applicantInfoFormReducer", () => {
    describe("on applicantInfoFormSuccess", () => {
      it("should update loading", () => {
        const state = applicantInfoFormReducer(initialState, applicantInfoFormSuccess());
        const { loading } = state;
        expect(loading).toBe(false);
      });
    });

    describe("on applicantInfoFormFail", () => {
      it("should update loading", () => {
        const state = applicantInfoFormReducer(initialState, applicantInfoFormFail());
        const { loading } = state;
        expect(loading).toBe(false);
      });
    });

    describe("on default", () => {
      it("should return intialState", () => {
        const mockAction = { type: undefined };
        const state = applicantInfoFormReducer(initialState, mockAction);
        expect(state).toBe(initialState);
      });
    });
  });
});
