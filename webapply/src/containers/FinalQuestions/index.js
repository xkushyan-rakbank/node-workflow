import { connect } from "react-redux";
import { getSignatories } from "../../store/selectors/appConfig";
import { FinalQuestionsComponent } from "./FinalQuestions";

const mapStateToProps = state => ({
  signatories: getSignatories(state)
});

export const FinalQuestions = connect(mapStateToProps)(FinalQuestionsComponent);
