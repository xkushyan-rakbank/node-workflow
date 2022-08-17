import { connect } from "react-redux";

import {
  getOrganizationInfo,
  getSignatories,
  getKycAnnexureDetails
} from "../../../../../../store/selectors/appConfig";
import { SignatoryEmploymentDetailsComponent } from "./SignatoryEmploymentDetails";

const mapStateToProps = state => ({
  companyName: getOrganizationInfo(state).companyName,
  signatoryInfo: getSignatories(state),
  kycAnnexureDetails: getKycAnnexureDetails(state)
});

export const SignatoryEmploymentDetails = connect(mapStateToProps)(
  SignatoryEmploymentDetailsComponent
);
