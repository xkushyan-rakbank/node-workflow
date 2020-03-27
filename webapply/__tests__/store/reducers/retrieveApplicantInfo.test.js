import reducer from "../../../src/store/reducers/retrieveApplicantInfo";
import { retrieveApplicantInfoSuccess } from "../../../src/store/actions/retrieveApplicantInfo";

describe("retrieveApplicantInfo reducer test", () => {
  it("should handle RETRIEVE_APPLICANT_INFO_SUCCESS action type", () => {
    const searchResults = [1, 2];

    expect(reducer(undefined, retrieveApplicantInfoSuccess(searchResults))).toMatchObject({
      searchResults
    });
  });
});
