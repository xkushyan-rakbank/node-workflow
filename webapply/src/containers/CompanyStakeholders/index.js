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
  getIsAllStakeholdersStepsCompleted
} from "../../store/selectors/completedSteps";
import {
  changeEditableStakeholder,
  createNewStakeholder,
  deleteStakeholder
} from "../../store/actions/stakeholders";
import { sendProspectToAPIPromisify } from "../../store/actions/sendProspectToAPI";
import { getApplicantFullName, getOrganizationInfo } from "../../store/selectors/appConfig";
import { CompanyStakeholdersContainer } from "./CompanyStakeholders";
import { createKycTransaction, entityConfirmationPromisify } from "../../store/actions/kyc";

const mapStateToProps = state => ({
  fullName: getApplicantFullName(state),
  companyCategory: getOrganizationInfo(state).companyCategory,
  isSendingProspect: getIsSendingProspect(state),
  stakeholdersIds: getStakeholdersIds(state),
  stakeholders: getStakeholders(state),
  percentage: getPercentage(state),
  isAllStakeholdersStepsCompleted: getIsAllStakeholdersStepsCompleted(state),
  isAnyStakeholderStepsCompleted: getIsAnyStakeholderStepsCompleted(state),
  editableStakeholder: getEditableStakeholder(state),
  hasSignatories: checkIsHasSignatories(state)
});

const mapDispatchToProps = {
  deleteStakeholder,
  createNewStakeholder,
  changeEditableStakeholder,
  createKycTransaction,
  sendProspectToAPI: sendProspectToAPIPromisify,
  entityConfirmation: entityConfirmationPromisify
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyStakeholdersContainer);
