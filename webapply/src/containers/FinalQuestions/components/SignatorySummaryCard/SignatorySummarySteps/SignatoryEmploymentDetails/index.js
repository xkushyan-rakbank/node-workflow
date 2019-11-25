import { updateProspect } from "../../../../../../store/actions/appConfig";
import { connect } from "react-redux";
import { getInputValueById } from "../../../../../../store/selectors/input";
import { SignatoryEmploymentDetailsComponent } from "./SignatoryEmploymentDetails";

const mapStateToProps = (state, { index }) => ({
  companyName: getInputValueById(state, "Org.companyName"),
  employerName: getInputValueById(state, "SigEmpd.employerName", [index, 0]),
  employmentType: getInputValueById(state, "SigEmpd.employmentType", [index, 0]),
  isWorkAtTheCompany: getInputValueById(state, "SigEmpd.isWorkAtTheCompany", [index, 0])
});

const mapDispatchToProps = {
  updateProspect
};

export const SignatoryEmploymentDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignatoryEmploymentDetailsComponent);
