import * as appConfig from "../../../src/store/actions/appConfig";

describe("actions for app config", () => {
  it("should loadMetaData with undefined argument", () => {
    const payload = undefined;
    const expectedAction = { type: appConfig.LOAD_META_DATA, payload: "" };
    expect(appConfig.loadMetaData(payload)).toEqual(expectedAction);
  });

  it("should loadMetaData with valid argument", () => {
    const payload = { freeField5: {} };
    const expectedAction = { type: appConfig.LOAD_META_DATA, payload: payload.freeField5 };
    expect(appConfig.loadMetaData(payload)).toEqual(expectedAction);
  });

  it("should receiveAppConfig", () => {
    const expectedAction = { type: appConfig.RECEIVE_APPCONFIG };
    expect(appConfig.receiveAppConfig()).toEqual(expectedAction);
  });

  it("should receiveAppConfig success", () => {
    const payload = {};
    const expectedAction = { type: appConfig.RECEIVE_APPCONFIG_SUCCESS, payload };
    expect(appConfig.receiveAppConfigSuccess(payload)).toEqual(expectedAction);
  });

  it("should receiveAppConfig fail", () => {
    const payload = {};
    const expectedAction = { type: appConfig.RECEIVE_APPCONFIG_FAIL, payload };
    expect(appConfig.receiveAppConfigFail(payload)).toEqual(expectedAction);
  });

  it("should update prospect without gaEvent", () => {
    const payload = {};
    const expectedAction = { type: appConfig.UPDATE_PROSPECT, payload };
    expect(appConfig.updateProspect(payload)).toEqual(expectedAction);
  });

  it("should update prospect with gaEvent", () => {
    const gaEvent = "GA_EVENT";
    const payload = {};
    const expectedAction = {
      type: appConfig.UPDATE_PROSPECT,
      payload,
      meta: {
        analytics: {
          eventType: gaEvent
        }
      }
    };
    expect(appConfig.updateProspect(payload, gaEvent)).toEqual(expectedAction);
  });

  it("should set config", () => {
    const payload = {};
    const expectedAction = { type: appConfig.SET_CONFIG, payload };
    expect(appConfig.setConfig(payload)).toEqual(expectedAction);
  });

  it("should set prospect", () => {
    const payload = {};
    const expectedAction = { type: appConfig.SET_PROSPECT, payload };
    expect(appConfig.setProspect(payload)).toEqual(expectedAction);
  });

  it("should reset prospect", () => {
    const expectedAction = { type: appConfig.RESET_PROSPECT };
    expect(appConfig.resetProspect()).toEqual(expectedAction);
  });

  it("should update prospectId", () => {
    const payload = "12345";
    const expectedAction = { type: appConfig.UPDATE_PROSPECT_ID, payload };
    expect(appConfig.updateProspectId(payload)).toEqual(expectedAction);
  });

  it("should remove prospectId", () => {
    const expectedAction = { type: appConfig.REMOVE_PROSPECT_ID };
    expect(appConfig.removeProspectId()).toEqual(expectedAction);
  });

  it("should update viewId", () => {
    const viewId = "ApplicantInfo";
    const isSendToApi = true;
    const expectedAction = { type: appConfig.UPDATE_VIEW_ID, payload: { viewId, isSendToApi } };
    expect(appConfig.updateViewId(viewId, isSendToApi)).toEqual(expectedAction);
  });

  it("should save prospectModel", () => {
    const payload = {};
    const expectedAction = { type: appConfig.SAVE_SIGNATORY_MODEL, payload };
    expect(appConfig.saveSignatoryModel(payload)).toEqual(expectedAction);
  });

  it("should save organization info prospectModel", () => {
    const payload = {};
    const expectedAction = { type: appConfig.SAVE_ORGANIZATION_INFO_MODEL, payload };
    expect(appConfig.saveOrganizationInfoModel(payload)).toEqual(expectedAction);
  });

  it("should set accessToken", () => {
    const payload = "token";
    const expectedAction = { type: appConfig.SET_ACCESS_TOKEN, payload };
    expect(appConfig.setAccessToken(payload)).toEqual(expectedAction);
  });

  it("should reset applicantInfo", () => {
    const expectedAction = { type: appConfig.RESET_APPLICANT_INFO };
    expect(appConfig.resetApplicantInfo()).toEqual(expectedAction);
  });

  it("should set reinvoke", () => {
    const payload = true;
    const expectedAction = { type: appConfig.SET_EXPIRED, payload };
    expect(appConfig.setExpired(payload)).toEqual(expectedAction);
  });
});
