import { connect } from "react-redux";

import { getKycAnnexureDetails, getOrganizationInfo } from "../../../../store/selectors/appConfig";
import { updateProspect } from "../../../../store/actions/appConfig";

import { SigningPreferencesComponent } from "./SigningPreferences";

const mapStateToProps = state => ({
  organizationInfo: getOrganizationInfo(state),
  kycAnnexture: getKycAnnexureDetails(state)
});

const mapDispatchToProps = {
  updateProspect
};

export const SigningPreferences = connect(
  mapStateToProps,
  mapDispatchToProps
)(SigningPreferencesComponent);
