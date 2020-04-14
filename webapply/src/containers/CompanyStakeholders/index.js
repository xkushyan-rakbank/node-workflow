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
  getIsStakeholderStepsCompleted
} from "../../store/selectors/completedSteps";
import {
  changeEditableStakeholder,
  createNewStakeholder,
  deleteStakeholder
} from "../../store/actions/stakeholders";
import { sendProspectToAPIPromisify } from "../../store/actions/sendProspectToAPI";
import { CompanyStakeholdersContainer } from "./CompanyStakeholders";

const mapStateToProps = state => ({
  isSendingProspect: getIsSendingProspect(state),
  stakeholdersIds: getStakeholdersIds(state),
  stakeholders: getStakeholders(state),
  percentage: getPercentage(state),
  isStakeholderStepsCompleted: getIsStakeholderStepsCompleted(state),
  isAnyStakeholderStepsCompleted: getIsAnyStakeholderStepsCompleted(state),
  editableStakeholder: getEditableStakeholder(state),
  hasSignatories: checkIsHasSignatories(state)
});

const mapDispatchToProps = {
  deleteStakeholder,
  createNewStakeholder,
  changeEditableStakeholder,
  sendProspectToAPI: sendProspectToAPIPromisify
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyStakeholdersContainer);
