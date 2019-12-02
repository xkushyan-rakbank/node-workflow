import { connect } from "react-redux";
import get from "lodash/get";

import { updateProspect } from "../../../../../../store/actions/appConfig";
import { CompanyPreferredContactInformationComponent } from "./CompanyPreferredContactInformation";
import { getOrganizationInfo, getAccountInfo } from "../../../../../../store/selectors/appConfig";

const mapStateToProps = state => ({
  contactDetails: get(getOrganizationInfo(state), "contactDetails", {}),
  chequeBookApplied: get(getAccountInfo(state)[0], "chequeBookApplied", false)
});

const mapDispatchToProps = {
  updateProspect
};

export const CompanyPreferredContactInformation = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyPreferredContactInformationComponent);
