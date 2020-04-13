import { connect } from "react-redux";
import { sendProspectToAPIPromisify } from "../../store/actions/sendProspectToAPI";
import { getSignatories } from "../../store/selectors/appConfig";
import { FinalQuestionsPage } from "./FinalQuestionsPage";

const mapStateToProps = state => ({
  signatories: getSignatories(state)
});

const mapDispatchToProps = {
  sendProspectToAPI: sendProspectToAPIPromisify
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FinalQuestionsPage);
