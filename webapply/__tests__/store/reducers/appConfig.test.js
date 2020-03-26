import { REHYDRATE } from "redux-persist";
import reducer, { initialState } from "../../../src/store/reducers/appConfig";

import {
  receiveAppConfig,
  receiveAppConfigSuccess,
  receiveAppConfigFail,
  setConfig,
  setProspect,
  updateProspectId,
  removeProspectId,
  saveSignatoryModel,
  resetProspect,
  setAccessToken,
  resetApplicantInfo
} from "../../../src/store/actions/appConfig";
import { loginInfoFormSuccess, logout } from "../../../src/store/actions/loginForm";
import { UAE_CODE } from "../../../src/constants";

describe("app config reducer", () => {
  it("should create a reducer to rehydrate", () => {
    const action = { type: REHYDRATE };
    expect(reducer(initialState, action)).toStrictEqual(initialState);
  });

  it("should create a reducer to receive app config", () => {
    const expectedState = {
      ...initialState,
      loading: true,
      error: ""
    };
    expect(reducer(initialState, receiveAppConfig())).toStrictEqual(expectedState);
  });

  it("should create a reducer to receive app config success", () => {
    const action = { payload: [] };
    const expectedState = {
      ...initialState,
      ...action.payload,
      loading: false
    };
    expect(reducer(initialState, receiveAppConfigSuccess())).toStrictEqual(expectedState);
  });

  it("should create a reducer to login info form success", () => {
    const action = {};
    const expectedState = {
      ...initialState,
      authorizationToken: undefined
    };
    expect(reducer(initialState, loginInfoFormSuccess(action))).toStrictEqual(expectedState);
  });

  it("should create a reducer to set access token", () => {
    const payload = "123";
    const expectedState = {
      ...initialState,
      authorizationToken: payload
    };
    expect(reducer(initialState, setAccessToken(payload))).toStrictEqual(expectedState);
  });

  it("should create a reducer to receive appconfig fail", () => {
    const payload = false;
    const expectedState = {
      ...initialState,
      loading: false,
      error: payload || "error"
    };
    expect(reducer(initialState, receiveAppConfigFail(payload))).toStrictEqual(expectedState);
  });

  it("should create a reducer to set config", () => {
    const payload = 123;
    const expectedState = {
      ...initialState,
      ...payload
    };
    expect(reducer(initialState, setConfig(payload))).toStrictEqual(expectedState);
  });

  it("should create a reducer to set prospect", () => {
    const payload = {};
    const expectedState = {
      ...initialState,
      prospect: payload
    };
    expect(reducer(initialState, setProspect(payload))).toStrictEqual(expectedState);
  });

  it("should create a reducer to reset prospect", () => {
    const expectedState = {
      ...initialState,
      prospect: initialState.prospect
    };
    expect(reducer(initialState, resetProspect())).toStrictEqual(expectedState);
  });

  it("should create a reducer to update prospect id", () => {
    const payload = {};
    const expectedState = {
      ...initialState,
      prospect: {
        ...initialState.prospect,
        generalInfo: {
          ...undefined,
          prospectId: payload
        }
      }
    };
    expect(reducer(initialState, updateProspectId(payload))).toStrictEqual(expectedState);
  });

  it("should create a reducer to remove prospect id", () => {
    const expectedState = {
      ...initialState,
      prospect: {
        ...initialState.prospect,
        generalInfo: {
          ...undefined,
          prospectId: ""
        }
      }
    };
    expect(reducer(initialState, removeProspectId())).toStrictEqual(expectedState);
  });

  it("should create a reducer to save prospect model", () => {
    const expectedState = {
      ...initialState,
      signatoryModel: initialState.payload
    };
    expect(reducer(initialState, saveSignatoryModel())).toStrictEqual(expectedState);
  });

  it("should create a reducer to logout", () => {
    const expectedState = {
      ...initialState,
      login: {
        userName: "",
        password: ""
      },
      searchInfo: {
        ...initialState.searchInfo,
        fullName: "",
        countryCode: UAE_CODE,
        mobileNo: "",
        leadNumber: "",
        tradeLicenseNo: "",
        email: ""
      },
      prospect: {}
    };
    expect(reducer(initialState, logout())).toStrictEqual(expectedState);
  });

  it("should create a reducer to reset applicant info", () => {
    const expectedState = {
      ...initialState,
      authorizationToken: null,
      prospect: {
        ...initialState.prospect,
        applicantInfo: {
          fullName: "",
          email: "",
          countryCode: UAE_CODE,
          mobileNo: "",
          applyOnbehalf: false
        }
      }
    };
    expect(reducer(initialState, resetApplicantInfo())).toStrictEqual(expectedState);
  });
});
