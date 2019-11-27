import { connect } from "react-redux";
import get from "lodash/get";
import { updateProspect } from "../../../../../../store/actions/appConfig";
import { SignatoryPreferredMailingAddressComponent } from "./SignatoryPreferredMailingAddress";
import { getOrganizationInfo, getSignatories } from "../../../../../../store/selectors/appConfig";
import { prospect } from "../../../../../../constants/config";

const mapStateToProps = (state, { index }) => ({
  organizationAddressInfo: get(
    getOrganizationInfo(state),
    "addressInfo",
    prospect.organizationInfo.addressInfo
  ),
  signatoryAddressInfo: get(
    getSignatories(state)[index],
    "addressInfo",
    prospect.signatoryInfo[0].addressInfo
  ),
  sameAsCompanyAddress: get(
    getSignatories(state)[index],
    "sameAsCompanyAddress",
    prospect.signatoryInfo[0].sameAsCompanyAddress
  )
});

const mapDispatchToProps = {
  updateProspect
};

export const SignatoryPreferredMailingAddress = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignatoryPreferredMailingAddressComponent);
