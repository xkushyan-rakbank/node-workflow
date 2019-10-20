import * as uploadProspectDocument from "./../uploadProspectDocument";

describe("upload-prospect-document", () => {
  describe("ActionTypes", () => {
    it("should have a proper name for 'DOC_UPLOADER'", () => {
      expect(uploadProspectDocument.DOC_UPLOADER).toBe("DOC_UPLOADER");
    });
    it("should have a proper name for 'DOC_UPLOAD_DETAILS_SUCCESS'", () => {
      expect(uploadProspectDocument.DOC_UPLOAD_DETAILS_SUCCESS).toBe("DOC_UPLOAD_DETAILS_SUCCESS");
    });
    it("should have a proper name for 'DETAILS_UPLOAD_ERROR'", () => {
      expect(uploadProspectDocument.DETAILS_UPLOAD_ERROR).toBe("DETAILS_UPLOAD_ERROR");
    });
  });
});
