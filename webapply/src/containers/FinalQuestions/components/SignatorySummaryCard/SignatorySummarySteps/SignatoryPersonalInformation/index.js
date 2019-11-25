import { connect } from "react-redux";
import { getInputValueById } from "../../../../../../store/selectors/input";
import { SignatoryPersonalInformationComponent } from "./SignatoryPersonalInformation";

const mapStateToProps = (state, { index }) => ({
  maritalStatus: getInputValueById(state, "Sig.maritalStatus", [index, 0]),
  mothersMaidenName: getInputValueById(state, "Sig.mothersMaidenName", [index, 0]),
  maritalStatusOthers: getInputValueById(state, "Sig.maritalStatusOthers", [index, 0])
});

export const SignatoryPersonalInformation = connect(mapStateToProps)(
  SignatoryPersonalInformationComponent
);
