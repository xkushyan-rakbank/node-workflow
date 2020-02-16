import { connect } from "react-redux";

import { getSignatories } from "../../../../../../store/selectors/appConfig";
import { SignatorySourceOfFundsComponent } from "./SignatorySourceOfFunds";

const mapStateToProps = state => ({
  signatories: getSignatories(state)
});

export const SignatorySourceOfFunds = connect(mapStateToProps)(SignatorySourceOfFundsComponent);
