import reducer from "../../../src/store/reducers/retrieveApplicantInfo";
import { retrieveApplicantInfoSuccess, getProspectInfoPromisify, getProspectInfoSuccess } from "../../../src/store/actions/retrieveApplicantInfo";

describe("retrieveApplicantInfo reducer test", () => {
  it("should handle RETRIEVE_APPLICANT_INFO_SUCCESS action type", () => {
    const searchResults = [1, 2];

    expect(reducer(undefined, retrieveApplicantInfoSuccess(searchResults))).toMatchObject({
      searchResults
    });
  });

  it("should handle GET_PROSPECT_INFO_REQUEST action type", () => {
    const loadingProspectId = "some loadingProspectId value";

    expect(reducer(undefined, getProspectInfoPromisify(loadingProspectId))).toMatchObject({
      loadingProspectId
    });
  });

  it("should handle GET_PROSPECT_INFO_SUCCESS action type", () => {
    const loadingProspectId = "";

    expect(reducer(undefined, getProspectInfoSuccess())).toMatchObject({
      loadingProspectId
    })
  })
});
