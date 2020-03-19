import { ERROR_ACTION, WAIT_FOR_ACTION } from "redux-wait-for-action";
import * as applicantInfoForm from "../../../src/store/actions/applicantInfoForm";

describe("applicantInfoForm actions", () => {
  it("should applicantInfoFormPromisify", () => {
    const payload = {};
    const expectedAction = {
      type: applicantInfoForm.APPLICANT_INFO_FORM,
      [WAIT_FOR_ACTION]: applicantInfoForm.APPLICANT_INFO_FORM_SUCCESS,
      [ERROR_ACTION]: applicantInfoForm.APPLICANT_INFO_FORM_FAIL,
      payload
    };
    expect(applicantInfoForm.applicantInfoFormPromisify(payload)).toEqual(expectedAction);
  });

  it("should applicantInfoForm success", () => {
    const expectedAction = { type: applicantInfoForm.APPLICANT_INFO_FORM_SUCCESS };
    expect(applicantInfoForm.applicantInfoFormSuccess()).toEqual(expectedAction);
  });

  it("should applicantInfoForm fail", () => {
    const payload = {};
    const expectedAction = { type: applicantInfoForm.APPLICANT_INFO_FORM_FAIL, payload };
    expect(applicantInfoForm.applicantInfoFormFail(payload)).toEqual(expectedAction);
  });
});
