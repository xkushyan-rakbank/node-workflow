import { initialState } from "../sendProspectToAPI";
import sendProspectToAPIReducer from "../sendProspectToAPI";

import {
  sendProspectToAPI,
  sendProspectToAPISuccess,
  sendProspectToAPIFail,
  resetFormStep
} from "../../actions/sendProspectToAPI";

describe("sendProspectToAPI reducer", () => {
  afterEach(jest.resetAllMocks);

  describe("initialState", () => {
    it("should initialise initialState as the value", () => {
      const { loading, resetStep, prospectCopy } = initialState;

      expect(loading).toBe(false);
      expect(resetStep).toBe(false);
      expect(prospectCopy).toEqual({});
    });
  });

  describe("sendProspectToAPIReducer", () => {
    it("sendProspectToAPI should update loading", () => {
      const state = sendProspectToAPIReducer(initialState, sendProspectToAPI());
      const { loading } = state;
      expect(loading).toBe(true);
    });

    describe("sendProspectToAPISuccess", () => {
      const mockProspectCopy = {
        id: "123abcXYZ",
        name: "anonymus"
      };
      it("sendProspectToAPISuccess should update loading and prospectCopy", () => {
        const state = sendProspectToAPIReducer(
          initialState,
          sendProspectToAPISuccess(mockProspectCopy)
        );
        const { loading, prospectCopy } = state;
        expect(loading).toBe(false);
        expect(prospectCopy).toEqual(mockProspectCopy);
      });
    });

    it("sendProspectToAPIFail should update loading", () => {
      const state = sendProspectToAPIReducer(initialState, sendProspectToAPIFail());
      const { loading } = state;
      expect(loading).toBe(false);
    });

    describe("sendProspectToAPISuccess", () => {
      const mockdata = { resetStep: true };
      it("resetFormStep should update resetFormStep", () => {
        const state = sendProspectToAPIReducer(initialState, resetFormStep(mockdata));
        const { resetStep } = state;
        expect(resetStep).toBe(mockdata.resetStep);
      });
    });
  });
});
