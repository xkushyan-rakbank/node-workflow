import { getAuthorityTypeDisplayText } from "../../src/utils/getAuthoroityTypeDisplayText";

describe("getAuthorityTypeDisplayText tests", () => {
  const displayText = "some text";
  const authorityTypeValue = "some value";
  const authorityTypeDatalist = [{ value: authorityTypeValue, displayText }];

  it("should return displayText if value exist", () => {
    expect(getAuthorityTypeDisplayText(authorityTypeValue, authorityTypeDatalist)).toBe(
      displayText
    );
  });

  it("should return empty string if value does not exist", () => {
    const authorityTypeDatalist = [{ value: "another value", displayText }];
    expect(getAuthorityTypeDisplayText(authorityTypeValue, authorityTypeDatalist)).toBe("");
  });

  it("should return empty string if datalist is not provided", () => {
    expect(getAuthorityTypeDisplayText(authorityTypeValue)).toBe("");
  });
});
