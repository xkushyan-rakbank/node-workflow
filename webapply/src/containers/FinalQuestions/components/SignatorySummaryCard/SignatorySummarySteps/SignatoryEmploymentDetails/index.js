import { connect } from "react-redux";

import { getOrganizationInfo } from "../../../../../../store/selectors/appConfig";
import { SignatoryEmploymentDetailsComponent } from "./SignatoryEmploymentDetails";

const mapStateToProps = state => ({
  companyName: getOrganizationInfo(state).companyName
});

export const SignatoryEmploymentDetails = connect(mapStateToProps)(
  SignatoryEmploymentDetailsComponent
);
