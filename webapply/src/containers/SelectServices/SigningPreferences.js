import { connect } from "react-redux";

import { getSignatories } from "../../store/selectors/appConfig";
import { getGeneralInputProps } from "../../store/selectors/input";
import { updateProspect } from "../../store/actions/appConfig";

import { SigningPreferencesComponent } from "./components/SigningPreferences/SigningPreferences";

const mapStateToProps = state => ({
  signatoryInfo: getSignatories(state),
  signInfoFullNameInput: getGeneralInputProps(state, "Sig.fullName", [0]),
  accountSigningType: getGeneralInputProps(state, "SigAcntSig.accountSigningType", [0]),
  accountSigningInstn: getGeneralInputProps(state, "SigAcntSig.accountSigningInstn", [0])
});

const mapDispatchToProps = {
  updateProspect
};

export const SigningPreferences = connect(
  mapStateToProps,
  mapDispatchToProps
)(SigningPreferencesComponent);
