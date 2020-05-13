import { connect } from "react-redux";

import { getIsSendingProspect } from "../../store/selectors/sendProspectToAPI";
import {
  checkIsHasSignatories,
  getEditableStakeholder,
  getPercentage,
  getStakeholders,
  getStakeholdersIds
} from "../../store/selectors/stakeholders";
import {
  getIsAnyStakeholderStepsCompleted,
  getIsAllStakeholdersStepsCompleted,
  getStakeholderSteps
} from "../../store/selectors/completedSteps";
import {
  changeEditableStakeholder,
  createNewStakeholder,
  deleteStakeholder
} from "../../store/actions/stakeholders";
import { sendProspectToAPIPromisify } from "../../store/actions/sendProspectToAPI";
import { CompanyStakeholdersContainer } from "./CompanyStakeholders";
import { setStepStatus } from "../../store/actions/completedSteps";

const mapStateToProps = state => ({
  isSendingProspect: getIsSendingProspect(state),
  stakeholdersIds: getStakeholdersIds(state),
  stakeholders: getStakeholders(state),
  percentage: getPercentage(state),
  isAllStakeholdersStepsCompleted: getIsAllStakeholdersStepsCompleted(state),
  isAnyStakeholderStepsCompleted: getIsAnyStakeholderStepsCompleted(state),
  editableStakeholder: getEditableStakeholder(state),
  hasSignatories: checkIsHasSignatories(state),
  stakeholderSteps: getStakeholderSteps(state)
});

const mapDispatchToProps = {
  deleteStakeholder,
  createNewStakeholder,
  changeEditableStakeholder,
  sendProspectToAPI: sendProspectToAPIPromisify,
  setStepStatusUpdate: setStepStatus
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyStakeholdersContainer);
