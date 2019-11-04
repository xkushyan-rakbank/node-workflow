import { initialState } from "../appConfig";
import appConfigReducer from "../appConfig";

import {
  receiveAppConfig,
  receiveAppConfigSuccess,
  receiveAppConfigFail,
  setConfig,
  setProspect,
  updateProspectId,
  saveProspectModel
} from "../../actions/appConfig";

describe("appconfig reducer", () => {
  afterEach(jest.resetAllMocks);

  describe("initialState", () => {
    it("should initialise initialState as the value", () => {
      const {
        loading,
        uiConfig,
        endpoints,
        prospect,
        login,
        prospectModel,
        error,
        searchInfo
      } = initialState;

      expect(loading).toBe(false);
      expect(uiConfig).toEqual({});
      expect(endpoints).toEqual({});
      expect(prospect).toEqual({});
      expect(login).toEqual({});
      expect(prospectModel).toEqual({});
      expect(error).toBe("");
      expect(searchInfo).toEqual({ segment: "sme" });
    });
  });

  describe("appConfigReducer", () => {
    describe("on receiveAppConfig", () => {
      it("should update loading", () => {
        const state = appConfigReducer(initialState, receiveAppConfig());
        const { loading } = state;
        expect(loading).toBe(true);
      });
    });
    describe("on receiveAppConfigSuccess", () => {
      it("should update loading", () => {
        const state = appConfigReducer(initialState, receiveAppConfigSuccess());
        const { loading } = state;
        expect(loading).toBe(false);
      });
    });
    describe("on receiveAppConfigFail", () => {
      it("should update loading", () => {
        const state = appConfigReducer(initialState, receiveAppConfigFail());
        const { loading } = state;
        expect(loading).toBe(false);
      });
    });
    describe("on setConfig", () => {
      const responseData = {};
      const testData = {
        prospect: responseData
      };
      it("should update config", () => {
        const state = appConfigReducer(initialState, setConfig(testData));
        const { prospect } = state;
        expect(prospect).toBe(responseData);
      });
    });
    describe("on setProspect", () => {
      const responseData = "123abcXYZ";
      const testData = {
        prospect: responseData
      };
      it("should update prospect", () => {
        const state = appConfigReducer(initialState, setProspect(testData));
        const { prospect } = state;
        expect(prospect).toBe(testData);
      });
    });
    describe("on updateProspectId", () => {
      const responseData = "123abcXYZ";
      const testData = {
        prospect: responseData
      };
      it("should update ProspectId", () => {
        const state = appConfigReducer(initialState, updateProspectId(testData));
        const { prospect } = state;
        expect(prospect.generalInfo.prospectId).toBe(testData);
      });
    });
    describe("on saveProspectModel", () => {
      const responseData = "123abcXYZ";
      const testData = {
        prospect: responseData
      };
      it("should update ProspectModel", () => {
        const state = appConfigReducer(initialState, saveProspectModel(testData));
        const { prospectModel } = state;
        expect(prospectModel).toBe(testData);
      });
    });

    describe("on default", () => {
      it("should return intialState", () => {
        const mockAction = { type: undefined };
        const state = appConfigReducer(initialState, mockAction);
        expect(state).toBe(initialState);
      });
    });
  });
});
