import { GA } from "../../src/utils/ga";

describe("google analytics test", () => {
  const event = "some event";
  const accountType = "some account type";

  it("should trigger event and function must be called with args", () => {
    GA.triggerEvent({ event, accountType });

    expect(window.dataLayer).toEqual([{ event, ProductName: accountType }]);
  });
});
