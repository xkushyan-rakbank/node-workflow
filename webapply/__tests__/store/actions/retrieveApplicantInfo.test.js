import { ERROR_ACTION, WAIT_FOR_ACTION, CALLBACK_ARGUMENT } from "redux-wait-for-action";

import {
  RETRIEVE_APPLICANT_INFO,
  RETRIEVE_APPLICANT_INFO_SUCCESS,
  GET_PROSPECT_INFO_REQUEST,
  GET_PROSPECT_INFO_SUCCESS,
  GET_PROSPECT_INFO_FAIL,
  retrieveApplicantInfo,
  retrieveApplicantInfoSuccess,
  getProspectInfoSuccess,
  getProspectInfoPromisify,
  getProspectInfoFail
} from "../../../src/store/actions/retrieveApplicantInfo";

describe("retrieve application info actions", () => {
  it("should create an action to retrieve application info", () => {
    const payload = {};
    const expectedAction = {
      type: RETRIEVE_APPLICANT_INFO,
      payload
    };
    expect(retrieveApplicantInfo(payload)).toEqual(expectedAction);
  });

  it("should create an action to retrieve application info success", () => {
    const payload = {};
    const expectedAction = {
      type: RETRIEVE_APPLICANT_INFO_SUCCESS,
      payload
    };
    expect(retrieveApplicantInfoSuccess(payload)).toEqual(expectedAction);
  });

  it("should create an action to login info form promisify", () => {
    const prospectId = "12";
    const expectedAction = {
      type: GET_PROSPECT_INFO_REQUEST,
      [WAIT_FOR_ACTION]: GET_PROSPECT_INFO_SUCCESS,
      [ERROR_ACTION]: GET_PROSPECT_INFO_FAIL,
      [CALLBACK_ARGUMENT]: ({ payload: { prospect } }) => prospect,
      payload: {
        prospectId
      }
    };
    expect(getProspectInfoPromisify(prospectId)).toMatchObject(expectedAction);
  });

  it("should create an action to get prospect info success", () => {
    const prospect = {};
    const expectedAction = {
      type: GET_PROSPECT_INFO_SUCCESS,
      payload: { prospect }
    };
    expect(getProspectInfoSuccess(prospect)).toEqual(expectedAction);
  });

  it("should create an action to get prospect info fail", () => {
    const error = {};
    const expectedAction = {
      type: GET_PROSPECT_INFO_FAIL,
      error
    };
    expect(getProspectInfoFail(error)).toEqual(expectedAction);
  });
});
