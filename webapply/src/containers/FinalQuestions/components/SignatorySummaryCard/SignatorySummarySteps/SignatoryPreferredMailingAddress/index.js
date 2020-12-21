import { connect } from "react-redux";
import get from "lodash/get";
import { SignatoryPreferredMailingAddressComponent } from "./SignatoryPreferredMailingAddress";
import { getSignatories } from "../../../../../../store/selectors/appConfig";

const mapStateToProps = (state, { index }) => ({
  signatoriesEmirateCity: get(
    getSignatories(state)[index],
    "addressInfo[0].addressDetails[0].emirateCity",
    ""
  ),
  signatoriesPoBox: get(getSignatories(state)[index], "addressInfo[0].addressDetails[0].poBox", "")
});

export const SignatoryPreferredMailingAddress = connect(mapStateToProps)(
  SignatoryPreferredMailingAddressComponent
);
