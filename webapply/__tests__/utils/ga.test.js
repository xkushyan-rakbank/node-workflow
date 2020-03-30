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

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should trigger event", () => {
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
