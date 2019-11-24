import { connect } from "react-redux";
import { getInputValueById } from "../../../../../../store/selectors/input";
import { CompanyPreferredMailingAddressComponent } from "./CompanyPreferredMailingAddress";

const mapStateToProps = state => ({
  emirateCity: getInputValueById(state, "OrgAddrAdrd.emirateCity", [0, 0]),
  spaceType: getInputValueById(state, "OrgAddrAdrdSpace.spaceType", [0, 0])
});

export const CompanyPreferredMailingAddress = connect(mapStateToProps)(
  CompanyPreferredMailingAddressComponent
);
