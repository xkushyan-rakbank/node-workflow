import { connect } from "react-redux";
import get from "lodash/get";
import { SignatoryPreferredMailingAddressComponent } from "./SignatoryPreferredMailingAddress";
import { getOrganizationInfo } from "../../../../../../store/selectors/appConfig";

const mapStateToProps = state => ({
  organisationAddressFieldDesc: get(
    getOrganizationInfo(state),
    "addressInfo[0].addressDetails[0].addressFieldDesc",
    ""
  ),
  organisationAddressLine1: get(
    getOrganizationInfo(state),
    "addressInfo[0].addressDetails[0].addressLine1",
    ""
  ),
  organisationEmirateCity: get(
    getOrganizationInfo(state),
    "addressInfo[0].addressDetails[0].emirateCity",
    ""
  ),
  organisationPoBox: get(getOrganizationInfo(state), "addressInfo[0].addressDetails[0].poBox", "")
});

export const SignatoryPreferredMailingAddress = connect(mapStateToProps)(
  SignatoryPreferredMailingAddressComponent
);
