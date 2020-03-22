import reducer, { initialState } from "../../../src/store/reducers/retrieveApplicantInfo";
import { retrieveApplicantInfoSuccess } from "../../../src/store/actions/retrieveApplicantInfo";
import {
  MOCK_SEARCH_RESULT,
  UNMATCHED_ACTION
} from "../../../__mocks__/storeMock";

describe('retrieveApplicantInfo reducer test', () => {
  it('RETRIEVE_APPLICANT_INFO_SUCCESS action type', () => {
    const searchResults = [MOCK_SEARCH_RESULT, MOCK_SEARCH_RESULT]
    const expectedState = {
      ...initialState,
      searchResults
    };
    expect(reducer(initialState, retrieveApplicantInfoSuccess(searchResults))).toStrictEqual(expectedState);
  });

  it("check default action type", () => {
    expect(reducer(undefined, UNMATCHED_ACTION)).toStrictEqual(initialState);
  });
});