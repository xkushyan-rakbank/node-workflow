import { GA } from "../../src/utils/ga";

jest.mock("../../src/utils/ga", () => ({
  GA: {
    triggerEvent: jest.fn()
  }
}));

describe("google analytics test", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should trigger event and function must be called with args", () => {
    const windowSpy = jest.spyOn(global, "window", "get");
    const args = {
      event: "ProductPage",
      accountType: "RakStarter"
    };

    windowSpy.mockImplementation(() => ({
      dataLayer: []
    }));

    GA.triggerEvent(args);

    expect(GA.triggerEvent).toBeCalled();
    expect(GA.triggerEvent).toBeCalledWith(args);

    windowSpy.mockRestore();
  });
});
