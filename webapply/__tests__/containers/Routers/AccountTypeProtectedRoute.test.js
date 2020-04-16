import React from "react";
import { render } from "@testing-library/react";

import { AccountTypeProtectedRoute } from "../../../src/containers/Routers/AccountTypeProtectedRoute";
import { ProtectedRoute, RedirectRoute } from "../../../src/components/Routes";
import { RAKSTARTER_ROUTE_PARAM } from "../../../src/constants";
import routes from "../../../src/routes";

jest.mock("../../../src/components/Routes");

describe("AccountTypeProtectedRoute test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    ProtectedRoute.mockReturnValue(null);
    RedirectRoute.mockReturnValue(null);
  });

  it("should render route", () => {
    const props = {
      computedMatch: { params: { accountType: RAKSTARTER_ROUTE_PARAM } }
    };
    render(<AccountTypeProtectedRoute {...props} />);

    expect(ProtectedRoute).toBeCalled();
  });

  it("should redirect to accountsComparison page when accountType param didn't match", () => {
    const props = {
      computedMatch: { params: { accountType: "some invalid type" } }
    };

    render(<AccountTypeProtectedRoute {...props} />);

    expect(RedirectRoute.mock.calls[0][0]).toEqual({ to: routes.accountsComparison });
  });
});
