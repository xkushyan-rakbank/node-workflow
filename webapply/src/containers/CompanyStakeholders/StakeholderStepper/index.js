import { connect } from "react-redux";

import { StakeholderStepperContainer } from "./StakeholderStepper";
import { getEditableStakeholder } from "../../../store/selectors/stakeholders";
import { sendProspectToAPIPromisify } from "../../../store/actions/sendProspectToAPI";
import { changeEditableStakeholder } from "../../../store/actions/stakeholders";

const mapStateToProps = state => ({
  editableStakeholder: getEditableStakeholder(state)
});

const mapDispatchToProps = {
  sendProspectToAPI: sendProspectToAPIPromisify,
  changeEditableStakeholder
};

export const StakeholderStepper = connect(
  mapStateToProps,
  mapDispatchToProps
)(StakeholderStepperContainer);
