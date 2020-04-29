import { getTitleForAccountType } from "../../../src/containers/MyApplications/utils";

describe("MyApplications utils test", () => {
  it("should return title for account type", () => {
    expect(getTitleForAccountType("RAKelite")).toBe("Business Elite");
  });
});
