import { connect } from "react-redux";
import { updateProspect } from "../../../../../../store/actions/appConfig";
import { getInputValueById } from "../../../../../../store/selectors/input";
import { SignatoryPreferredMailingAddressComponent } from "./SignatoryPreferredMailingAddress";

const mapStateToProps = (state, { index }) => ({
  sameAsCompanyAddress: getInputValueById(state, "Sig.sameAsCompanyAddress", [index]),
  organizationEmirateCity: getInputValueById(state, "OrgAddrAdrd.emirateCity", [0, 0]),
  organizationPoBox: getInputValueById(state, "OrgAddrAdrd.poBox", [0, 0]),
  organizationAddressLine1: getInputValueById(state, "OrgAddrAdrd.addressLine1", [0, 0]),
  organizationAddressFieldDesc: getInputValueById(state, "OrgAddrAdrd.addressFieldDesc", [0, 0]),
  emirateCity: getInputValueById(state, "SigAddrAdrd.emirateCity", [index, 0, 0])
});

const mapDispatchToProps = {
  updateProspect
};

export const SignatoryPreferredMailingAddress = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignatoryPreferredMailingAddressComponent);
