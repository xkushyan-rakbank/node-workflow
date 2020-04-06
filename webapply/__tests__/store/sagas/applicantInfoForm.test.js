import { runSaga } from "redux-saga";

import applicantInfoSaga, {
  applicantInfoFormSaga
} from "../../../src/store/sagas/applicantInfoForm";
import {
  APPLICANT_INFO_FORM,
  applicantInfoFormSuccess,
  applicantInfoFormFail
} from "../../../src/store/actions/applicantInfoForm";
import { updateProspect, updateProspectId } from "../../../src/store/actions/appConfig";
import { resetInputsErrors, setInputsErrors } from "../../../src/store/actions/serverValidation";
import { generateCodeSuccess } from "../../../src/store/actions/otp";
import { prospect as prospectApi } from "../../../src/api/apiClient";
import { FieldsValidationError } from "../../../src/api/serverErrors";
import {
  getApplicationInfo,
  getAuthorizationHeader,
  getIsRecaptchaEnable,
  getProspect
} from "../../../src/store/selectors/appConfig";
import { getReCaptchaToken } from "../../../src/store/selectors/reCaptcha";
import { log } from "../../../src/utils/loggger";

import { NEXT, SAVE } from "../../../src/constants";

jest.mock("../../../src/utils/loggger");
jest.mock("../../../src/store/selectors/appConfig");
jest.mock("../../../src/store/selectors/reCaptcha");

describe("applicantInfoForm saga test", () => {
  let dispatched = [];
  const state = "some state";
  const payload = "some payload";
  const headers = "some headers";
  const someField = "some field value";
  const applicationInfo = { someField };
  const prospect = { someField };
  const reCaptchaToken = "some reCaptcha token";
  const prospectId = "some prospectId";
  const data = { prospectId };
  const store = {
    dispatch: action => dispatched.push(action),
    getState: () => state
  };

  const prospectUpdated = {
    someField,
    applicantInfo: payload,
    applicationInfo: { someField, actionType: SAVE, saveType: NEXT }
  };

  beforeEach(() => {
    dispatched = [];
    log.mockReturnValue(null);
    getProspect.mockReturnValue(prospect);
    getAuthorizationHeader.mockReturnValue(headers);
    getApplicationInfo.mockReturnValue(applicationInfo);
    getReCaptchaToken.mockReturnValue(reCaptchaToken);
    getIsRecaptchaEnable.mockReturnValue(false);
    jest.clearAllMocks();
  });

  it("should handle applicantInfoSaga", () => {
    const gen = applicantInfoSaga().next().value;
    expect(gen.type).toEqual("ALL");
    expect(gen.payload[0].payload.args[0]).toEqual(APPLICANT_INFO_FORM);
    expect(gen.payload[0].payload.args[1]).toEqual(applicantInfoFormSaga);
  });

  it("should run applicantInfoFormSaga with token", async () => {
    const prospectUpdated = {
      someField,
      applicantInfo: payload,
      applicationInfo: { someField, actionType: SAVE, saveType: NEXT },
      recaptchaToken: reCaptchaToken
    };

    const spy = jest.spyOn(prospectApi, "create").mockReturnValue({ data });
    getIsRecaptchaEnable.mockReturnValue(true);

    await runSaga(store, applicantInfoFormSaga, { payload }).toPromise();

    expect(spy.mock.calls[0]).toEqual([prospectUpdated, headers]);
    expect(dispatched).toEqual([
      updateProspect({ prospect: prospectUpdated }),
      generateCodeSuccess(),
      updateProspectId(prospectId),
      resetInputsErrors(),
      applicantInfoFormSuccess()
    ]);

    spy.mockRestore();
  });

  it("should run applicantInfoFormSaga without token", async () => {
    const spy = jest.spyOn(prospectApi, "create").mockReturnValue({ data });

    await runSaga(store, applicantInfoFormSaga, { payload }).toPromise();

    expect(spy.mock.calls[0]).toEqual([prospectUpdated, headers]);
    expect(dispatched).toEqual([
      updateProspect({ prospect: prospectUpdated }),
      generateCodeSuccess(),
      updateProspectId(prospectId),
      resetInputsErrors(),
      applicantInfoFormSuccess()
    ]);

    spy.mockRestore();
  });

  it("should throw error", async () => {
    const error = "some error";
    const spy = jest.spyOn(prospectApi, "create").mockImplementation(() => {
      throw error;
    });

    await runSaga(store, applicantInfoFormSaga, { payload }).toPromise();

    expect(log.mock.calls[0]).toEqual([error]);
    expect(spy.mock.calls[0]).toEqual([prospectUpdated, headers]);
    expect(dispatched).toEqual([
      updateProspect({ prospect: prospectUpdated }),
      applicantInfoFormFail(error)
    ]);

    spy.mockRestore();
  });

  it("should throw fields validation error", async () => {
    const errors = "some errors";
    const validationError = new FieldsValidationError({
      name: "name",
      message: "message",
      errorType: "errorType",
      errors
    });

    const spy = jest.spyOn(prospectApi, "create").mockImplementation(() => {
      throw validationError;
    });

    await runSaga(store, applicantInfoFormSaga, { payload }).toPromise();

    expect(spy.mock.calls[0]).toEqual([prospectUpdated, headers]);
    expect(dispatched).toEqual([
      updateProspect({ prospect: prospectUpdated }),
      setInputsErrors(errors),
      applicantInfoFormFail(validationError)
    ]);

    spy.mockRestore();
  });
});
