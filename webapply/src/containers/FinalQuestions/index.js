import { connect } from "react-redux";
import { sendProspectToAPIPromisify } from "../../store/actions/sendProspectToAPI";
import { setStepStatus } from "../../store/actions/completedSteps";
import { getSignatories } from "../../store/selectors/appConfig";
import { FinalQuestionsPage } from "./FinalQuestionsPage";

const mapStateToProps = state => ({
  signatories: getSignatories(state)
});

const mapDispatchToProps = {
  sendProspectToAPI: sendProspectToAPIPromisify,
  setStepStatusUpdate: setStepStatus
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FinalQuestionsPage);
