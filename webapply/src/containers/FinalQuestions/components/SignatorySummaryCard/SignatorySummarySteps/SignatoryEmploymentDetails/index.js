import { connect } from "react-redux";
import get from "lodash/get";
import { getOrganizationInfo } from "../../../../../../store/selectors/appConfig";
import { updateProspect } from "../../../../../../store/actions/appConfig";
import { SignatoryEmploymentDetailsComponent } from "./SignatoryEmploymentDetails";

const mapStateToProps = state => ({
  companyName: get(getOrganizationInfo(state), "companyName", "")
});

const mapDispatchToProps = {
  updateProspect
};

export const SignatoryEmploymentDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignatoryEmploymentDetailsComponent);
