import { connect } from "react-redux";
import get from "lodash/get";
import { updateProspect } from "../../../../../../store/actions/appConfig";
import { CompanyPreferredContactInformationComponent } from "./CompanyPreferredContactInformation";
import { getOrganizationInfo, getAccountInfo } from "../../../../../../store/selectors/appConfig";
import { prospect } from "../../../../../../constants/config";
import { FIRST_ARRAY_INDEX } from "./constants";

const mapStateToProps = state => ({
  primaryPhoneNo: get(
    getOrganizationInfo(state),
    "contactDetails.primaryPhoneNo",
    prospect.organizationInfo.contactDetails.primaryPhoneNo
  ),
  chequeBookApplied: get(
    getAccountInfo(state)[FIRST_ARRAY_INDEX],
    "chequeBookApplied",
    prospect.accountInfo[FIRST_ARRAY_INDEX].chequeBookApplied
  )
});

const mapDispatchToProps = {
  updateProspect
};

export const CompanyPreferredContactInformation = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyPreferredContactInformationComponent);
