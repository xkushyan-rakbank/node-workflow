import { getVideoByAccountType } from "../../src/utils/getVideoByAccountType";
import { accountNames } from "../../src/constants";

describe.only("getVideoByAccountType test", () => {
  it("should return video by account type (default arguments)", () => {
    expect(getVideoByAccountType()).toHaveProperty("accountType", "");
    expect(getVideoByAccountType()).toHaveProperty("isIslamic", false);
  });

  it("should return video by account type (custom arguments)", () => {
    expect(getVideoByAccountType(accountNames.currentAccount, true)).toHaveProperty(
      "accountType",
      accountNames.currentAccount
    );

    expect(getVideoByAccountType(accountNames.currentAccount, true)).toHaveProperty(
      "isIslamic",
      true
    );
  });
});
