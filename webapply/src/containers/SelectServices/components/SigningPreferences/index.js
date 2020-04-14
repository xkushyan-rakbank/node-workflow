import { connect } from "react-redux";

import { getOrganizationInfo } from "../../../../store/selectors/appConfig";
import { updateProspect } from "../../../../store/actions/appConfig";

import { SigningPreferencesComponent } from "./SigningPreferences";

const mapStateToProps = state => ({
  organizationInfo: getOrganizationInfo(state)
});

const mapDispatchToProps = {
  updateProspect
};

export const SigningPreferences = connect(
  mapStateToProps,
  mapDispatchToProps
)(SigningPreferencesComponent);
