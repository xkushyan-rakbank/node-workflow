import { connect } from "react-redux";

import { getOrganizationInfo, getSignatories } from "../../../../../../store/selectors/appConfig";
import { SignatoryEmploymentDetailsComponent } from "./SignatoryEmploymentDetails";

const mapStateToProps = state => ({
  companyName: getOrganizationInfo(state).companyName,
  signatoryInfo: getSignatories(state)
});

export const SignatoryEmploymentDetails = connect(mapStateToProps)(
  SignatoryEmploymentDetailsComponent
);
