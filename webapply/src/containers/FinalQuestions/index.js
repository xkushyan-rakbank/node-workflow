import { connect } from "react-redux";
import { getSignatories } from "../../store/selectors/appConfig";
import { FinalQuestionsComponent } from "./FinalQuestions";
import { signatories } from "./constants";

const mapStateToProps = state => ({
  signatories: getSignatories(state),
  signatoriesMock: signatories.signatoryInfo
});

export const FinalQuestions = connect(mapStateToProps)(FinalQuestionsComponent);
