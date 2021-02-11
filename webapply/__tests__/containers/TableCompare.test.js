/* eslint-disable max-len */
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import { TableCompareComponent } from "../../src/containers/AccountsComparison/components/TableCompare/TableCompare";
import { accountTypes } from "../../src/containers/AccountsComparison/components/TableCompare/constants";

jest.mock("../../src/utils/useTrackingHistory/useTrackingHistory");
jest.mock(
  "../../src/containers/AccountsComparison/components/TableCompare/components/StyledTableBodyMobile",
  () => ({
    StyledTableBodyMobile: jest.fn().mockImplementation(() => null)
  })
);
jest.mock("react-router-dom", () => ({
  __esModule: true,
  useLocation: jest.fn().mockReturnValue({})
}));
jest.mock("react-redux", () => ({
  useDispatch: jest.fn().mockReturnValue({})
}));

describe("TableCompareComponent Component tests", () => {
  it("should open RAKstarter popup", () => {
    render(<TableCompareComponent selectedAccount={accountTypes.starter.name} />);
    fireEvent.click(screen.queryAllByText(/read more/i)[0]); // firing first ReadMore which is the RAKstarter.
    expect(screen.queryAllByText(/Yes, I'm sure/i)).toHaveLength(1); // this means the popup is open.
  });
});
