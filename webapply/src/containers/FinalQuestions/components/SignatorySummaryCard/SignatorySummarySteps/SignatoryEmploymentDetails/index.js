import { connect } from "react-redux";
import get from "lodash/get";
import { getOrganizationInfo } from "../../../../../../store/selectors/appConfig";
import { SignatoryEmploymentDetailsComponent } from "./SignatoryEmploymentDetails";

const mapStateToProps = state => ({
  companyName: get(getOrganizationInfo(state), "companyName", "")
});

export const SignatoryEmploymentDetails = connect(mapStateToProps)(
  SignatoryEmploymentDetailsComponent
);
