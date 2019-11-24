import { connect } from "react-redux";
import { updateProspect } from "../../../../../../store/actions/appConfig";
import { getInputValueById } from "../../../../../../store/selectors/input";
import { CompanyPreferredContactInformationComponent } from "./CompanyPreferredContactInformation";

const mapStateToProps = state => ({
  primaryPhoneNo: getInputValueById(state, "OrgCont.primaryPhoneNo"),
  primaryEmail: getInputValueById(state, "OrgCont.primaryEmail"),
  chequeBookApplied: getInputValueById(state, "Acnt.chequeBookApplied", [0])
});

const mapDispatchToProps = {
  updateProspect
};

export const CompanyPreferredContactInformation = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyPreferredContactInformationComponent);
