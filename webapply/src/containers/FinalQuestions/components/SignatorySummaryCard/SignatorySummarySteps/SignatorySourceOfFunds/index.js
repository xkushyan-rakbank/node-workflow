import { connect } from "react-redux";
import { updateProspect } from "../../../../../../store/actions/appConfig";
import { SignatorySourceOfFundsComponent } from "./SignatorySourceOfFunds";

const mapDispatchToProps = {
  updateProspect
};

export const SignatorySourceOfFunds = connect(
  null,
  mapDispatchToProps
)(SignatorySourceOfFundsComponent);
