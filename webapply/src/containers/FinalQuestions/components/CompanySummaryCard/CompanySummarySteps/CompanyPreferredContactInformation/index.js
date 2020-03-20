import { connect } from "react-redux";
import get from "lodash/get";

import { CompanyPreferredContactInformationComponent } from "./CompanyPreferredContactInformation";
import { getOrganizationInfo, getAccountInfo } from "../../../../../../store/selectors/appConfig";

const mapStateToProps = state => ({
  primaryPhoneNo: get(getOrganizationInfo(state), "contactDetails.primaryPhoneNo", ""),
  chequeBookApplied: get(getAccountInfo(state)[0], "chequeBookApplied", "")
});

const mapDispatchToProps = {};

export const CompanyPreferredContactInformation = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyPreferredContactInformationComponent);
