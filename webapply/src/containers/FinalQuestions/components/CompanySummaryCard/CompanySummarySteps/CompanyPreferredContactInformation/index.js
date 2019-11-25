import { connect } from "react-redux";
import { updateProspect } from "../../../../../../store/actions/appConfig";
import { CompanyPreferredContactInformationComponent } from "./CompanyPreferredContactInformation";
import { getOrganizationInfo, getAccountInfo } from "../../../../../../store/selectors/appConfig";
import get from "lodash/get";
import { prospect } from "../../../../../../constants/config";

const mapStateToProps = state => ({
  contactDetails: get(
    getOrganizationInfo(state),
    "contactDetails",
    prospect.organizationInfo.contactDetails
  ),
  chequeBookApplied: get(
    getAccountInfo(state)[0],
    "chequeBookApplied",
    prospect.accountInfo[0].chequeBookApplied
  )
});

const mapDispatchToProps = {
  updateProspect
};

export const CompanyPreferredContactInformation = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyPreferredContactInformationComponent);
