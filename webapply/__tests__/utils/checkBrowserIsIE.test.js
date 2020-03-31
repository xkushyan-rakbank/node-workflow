import { checkBrowserIsIE } from "../../src/utils/checkBrowserIsIE";

describe("checkBrowserIsIE test", () => {
  const windowSpy = jest.spyOn(global, "window", "get");

  it("should return true when userAgent contains IE metadata", () => {
    windowSpy.mockImplementation(() => ({
      navigator: {
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Trident/7.0; rv:11.0) like Gecko"
      }
    }));

    expect(checkBrowserIsIE()).toBe(true);

    windowSpy.mockRestore();
  });

  it("should return false when userAgent doesn't contain IE metadata", () => {
    windowSpy.mockImplementation(() => ({
      navigator: {
        userAgent:
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:61.0) Gecko/20100101 Firefox/74.0"
      }
    }));

    expect(checkBrowserIsIE()).toBe(false);

    windowSpy.mockRestore();
  });
});
