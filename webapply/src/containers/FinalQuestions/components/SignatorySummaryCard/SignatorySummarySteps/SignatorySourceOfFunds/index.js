import { connect } from "react-redux";

import { getSignatories } from "../../../../../../store/selectors/appConfig";
import { updateProspect } from "../../../../../../store/actions/appConfig";

import { SignatorySourceOfFundsComponent } from "./SignatorySourceOfFunds";

const mapDispatchToProps = {
  updateProspect
};

const mapStateToProps = state => ({
  signatories: getSignatories(state)
});

export const SignatorySourceOfFunds = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignatorySourceOfFundsComponent);
