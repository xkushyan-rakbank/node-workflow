import { connect } from "react-redux";
import get from "lodash/get";
import { CompanyPreferredMailingAddressComponent } from "./CompanyPreferredMailingAddress";
import { getOrganizationInfo } from "../../../../../../store/selectors/appConfig";
import { prospect } from "../../../../../../constants/config";

const mapStateToProps = state => ({
  addressInfo: get(getOrganizationInfo(state), "addressInfo", prospect.organizationInfo.addressInfo)
});

export const CompanyPreferredMailingAddress = connect(mapStateToProps)(
  CompanyPreferredMailingAddressComponent
);
