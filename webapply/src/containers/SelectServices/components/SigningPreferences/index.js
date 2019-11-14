import { compose } from "redux";
import { connect } from "react-redux";

import * as appConfigSelectors from "../../../../store/selectors/appConfig";
import { getGeneralInputProps } from "../../../../store/selectors/input";
import { updateProspect } from "../../../../store/actions/appConfig";

import { SigningPreferences } from "./SigningPreferences";

const mapStateToProps = state => ({
  signatoryInfo: appConfigSelectors.getSignatories(state),
  signInfoFullNameInput: getGeneralInputProps(state, "Sig.fullName", [0]),
  accountSigningType: getGeneralInputProps(state, "SigAcntSig.accountSigningType", [0]),
  accountSigningInstn: getGeneralInputProps(state, "SigAcntSig.accountSigningInstn", [0])
});

const mapDispatchToProps = {
  updateProspect
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SigningPreferences);
