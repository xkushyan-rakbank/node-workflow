import { formatJsonData } from "../../src/api/formatJsonData";

describe("format json data test", () => {
  it("should format json error", () => {
    const stackTrace = [
      { methodName: "some method", fileName: "some file", lineNumber: "some number" }
    ];
    const status = "some status";

    expect(formatJsonData({ stackTrace, status })).toEqual({
      status,
      stackTrace: "StackTrace: Method: some method, file: some file, line: some number"
    });
  });

  it("should format json error when stackTrace is not set", () => {
    const status = "some status";

    expect(formatJsonData({ status })).toEqual({
      status,
      stackTrace: ""
    });
  });
});
