import { connect } from "react-redux";
import get from "lodash/get";
import { SignatoryPreferredMailingAddressComponent } from "./SignatoryPreferredMailingAddress";
import { getSignatories, getOrganizationInfo } from "../../../../../../store/selectors/appConfig";

const mapStateToProps = (state, { index }) => ({
  signatoriesEmirateCity: get(
    getSignatories(state)[index],
    "addressInfo[0].addressDetails[0].emirateCity",
    ""
  ),
  signatoriesNationality: get(getSignatories(state)[index], "kycDetails.nationality", ""),
  signatoriesPoBox: get(getSignatories(state)[index], "addressInfo[0].addressDetails[0].poBox", ""),
  organisationInfo: get(getOrganizationInfo(state), "addressInfo", "")
});

export const SignatoryPreferredMailingAddress = connect(mapStateToProps)(
  SignatoryPreferredMailingAddressComponent
);
