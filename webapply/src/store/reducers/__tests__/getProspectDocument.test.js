import { initialState } from "./../../reducers/getProspectDocuments";
// import retrieveUploader from "./../../reducers/getProspectDocuments";
// import * as getProspectDocuments from "./../../actions/getProspectDocuments";

describe("getProspectDocumentsReducer", () => {
  afterEach(jest.resetAllMocks);

  describe("initialState", () => {
    it("should initialise 'getProspectDocumentsResponse' as an empty array", () => {
      const { getProspectDocumentsResponse } = initialState;
      expect(getProspectDocumentsResponse).toEqual({});
    });

    it("should initialise 'getProspectDocumentsStatus' as 'false'", () => {
      const { getProspectDocumentsStatus } = initialState;
      expect(getProspectDocumentsStatus).toBeFalsy();
    });
  });
});
