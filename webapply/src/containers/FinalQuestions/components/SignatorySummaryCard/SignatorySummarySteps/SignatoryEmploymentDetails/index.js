import { connect } from "react-redux";
import get from "lodash/get";
import { getSignatories, getOrganizationInfo } from "../../../../../../store/selectors/appConfig";
import { updateProspect } from "../../../../../../store/actions/appConfig";
import { SignatoryEmploymentDetailsComponent } from "./SignatoryEmploymentDetails";
import { prospect } from "../../../../../../constants/config";

const mapStateToProps = (state, { index }) => ({
  qualification: get(
    getSignatories(state)[index],
    "kycDetails.qualification",
    prospect.signatoryInfo[0].kycDetails.qualification
  ),
  employmentType: get(
    getSignatories(state)[index],
    "employmentDetails.employmentType",
    prospect.signatoryInfo[0].employmentDetails.employmentType
  ),
  designation: get(
    getSignatories(state)[index],
    "employmentDetails.designation",
    prospect.signatoryInfo[0].employmentDetails.designation
  ),
  totalExperienceYrs: get(
    getSignatories(state)[index],
    "employmentDetails.totalExperienceYrs",
    prospect.signatoryInfo[0].employmentDetails.totalExperienceYrs
  ),
  otherEmploymentType: get(
    getSignatories(state)[index],
    "employmentDetails.otherEmploymentType",
    prospect.signatoryInfo[0].employmentDetails.otherEmploymentType
  ),
  isWorkAtTheCompany: get(
    getSignatories(state)[index],
    "employmentDetails.isWorkAtTheCompany",
    prospect.signatoryInfo[0].employmentDetails.isWorkAtTheCompany
  ),
  employerName: get(
    getSignatories(state)[index],
    "employmentDetails.employerName",
    prospect.signatoryInfo[0].employmentDetails.employerName
  ),
  companyName: get(getOrganizationInfo(state), "companyName", prospect.organizationInfo.companyName)
});

const mapDispatchToProps = {
  updateProspect
};

export const SignatoryEmploymentDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignatoryEmploymentDetailsComponent);
