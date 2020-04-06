import { getErrorScreensIcons } from "../../src/utils/getErrorScreenIcons/getErrorScreenIcons";
import { ERRORS_TYPE } from "../../src/utils/getErrorScreenIcons/constants";
import { accountNames } from "../../src/constants";

const mockScreeningType = ERRORS_TYPE.DEDUPE;

jest.mock("../../src/utils/getErrorScreenIcons/constants", () => ({
  __esModule: true,
  ERRORS_TYPE: {},
  regularErrorScreenGifIcon: {
    [mockScreeningType]: "regular"
  },
  islamicErrorScreenGifIcon: {
    [mockScreeningType]: "islamic"
  },
  eliteErrorScreenGifIcon: {
    [mockScreeningType]: "elite"
  }
}));

describe("getErrorScreensIcons test", () => {
  it("should return islamic error icon", () => {
    expect(getErrorScreensIcons(accountNames.starter, true)).toBe("islamic");
  });

  it("should return regular error icon", () => {
    expect(getErrorScreensIcons()).toBe("regular");
  });

  it("should return elite error icon", () => {
    expect(getErrorScreensIcons(accountNames.elite)).toBe("elite");
  });
});
