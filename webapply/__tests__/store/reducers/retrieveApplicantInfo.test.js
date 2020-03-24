import reducer, { initialState } from "../../../src/store/reducers/retrieveApplicantInfo";
import { retrieveApplicantInfoSuccess } from "../../../src/store/actions/retrieveApplicantInfo";

describe('retrieveApplicantInfo reducer test', () => {
  it('RETRIEVE_APPLICANT_INFO_SUCCESS action type', () => {
    const searchResults = [1, 2]
    const expectedState = {
      ...initialState,
      searchResults
    };
    expect(reducer(initialState, retrieveApplicantInfoSuccess(searchResults))).toStrictEqual(expectedState);
  });
});