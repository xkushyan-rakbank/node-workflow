import { updateProspect } from "../../../../../../store/actions/appConfig";
import { connect } from "react-redux";
import { getInputNameById, getInputValueById } from "../../../../../../store/selectors/input";
import { SignatorySourceOfFundsComponent } from "./SignatorySourceOfFunds";

const mapStateToProps = (state, { index }) => ({
  soursOfWealth: getInputValueById(state, "SigKycdWlth.wealthType", [index]),
  otherSoursOfWealth: getInputValueById(state, "SigKycdWlth.others", [index]),
  otherWealthTypeInputName: getInputNameById(state, "SigKycdWlth.others", [index])
});

const mapDispatchToProps = {
  updateProspect
};

export const SignatorySourceOfFunds = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignatorySourceOfFundsComponent);
