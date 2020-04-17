import { formatAuditTrailInfo } from "../../../../../src/containers/AgentPages/SearchedAppInfo/utils/formatAuditTrailInfo";

describe("formatAuditTrailInfo test", () => {
  it("should return empty array when auditTrailInfo is empty", () => {
    expect(formatAuditTrailInfo()).toEqual([]);
  });

  it("should return formated array", () => {
    expect(formatAuditTrailInfo([{ modifiedDateTime: "2017-07-21 17:32:28" }])).toEqual([
      { modifiedDateTime: "21-07-2017 17:32:28" }
    ]);
  });
});
