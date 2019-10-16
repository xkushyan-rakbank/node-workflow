import React from "react";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";

import SubmitApplication from "../SubmitApplication";

describe("SubmitApplication", () => {
  const initialState = {
    appConfig: {
      prospect: "1234"
    }
  };
  const props = {
    signatoryInfo: jest.fn(),
    accountInfo: jest.fn(),
    applicationInfo: jest.fn(),
    organizationInfo: jest.fn(),
    isAgentLoggedIn: false
  };

  const mockStore = configureStore();
  let store = mockStore(initialState);

  describe("render", () => {
    it("renders the component", () => {
      shallow(<SubmitApplication store={store} {...props} />);
    });
  });

  //it("should render my component", () => {});
});
