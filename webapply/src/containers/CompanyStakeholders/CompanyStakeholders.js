import React, { useCallback } from "react";
import { connect } from "react-redux";
import FilledStakeholderCard from "../../components/FilledStakeholderCard";
import StakeholderStepper from "../StakeholderStepper/StakeholderStepper";
import { AddStakeholderButton } from "../../components/StakeholderStepForms/AddStakeholderButton/AddStakeholderButton";
import { ErrorMessage } from "../../components/Notifications";
import { SubmitButton } from "../../components/Buttons/SubmitButton";
import { BackLink } from "../../components/Buttons/BackLink";
import ConfirmDialog from "../../components/ConfirmDialod";
import routes from "../../routes";
import {
  addNewStakeholder,
  deleteStakeholder,
  editStakeholder,
  openConfirmDialog,
  closeConfirmDialog,
  confirmHandler
} from "../../store/actions/stakeholders";
import { getSendProspectToAPIInfo } from "../../store/selectors/appConfig";
import { sendProspectToAPI } from "../../store/actions/sendProspectToAPI";
import {
  stakeholdersSelector,
  stakeholdersState,
  percentageSelector
} from "../../store/selectors/stakeholder";
import { useStyles } from "./styled";

const MAX_STAKEHOLDERS_LENGTH = 6;

const CompanyStakeholders = props => {
  const classes = useStyles();
  const goToFinalQuestions = () => props.history.push(routes.finalQuestions);
  const {
    stakeholders,
    editableStakeholder,
    isConfirmDialogOpen,
    isNewStakeholder,
    percentage,
    editStakeholder: editHandler,
    deleteStakeholder: deleteHandler
  } = props;
  const isShowingAddButton = stakeholders.length < MAX_STAKEHOLDERS_LENGTH;
  const isLowPercentage = percentage < 100;
  const isDisableNextStep = (stakeholders.length < 1 && !!editableStakeholder) || isLowPercentage;

  const errorMessage = `Shareholders ${percentage}% is less than 100%, either add a new stakeholder
   or edit the shareholding % for the added stakeholders.`;

  const editStakeholderHandler = useCallback(index => editHandler(index), [editHandler]);
  const handleDeleteStakeholder = useCallback(id => deleteHandler(id), [deleteHandler]);

  return (
    <>
      <h2>Add your company’s stakeholders</h2>
      <p className="formDescription">
        Now we need to know about those who have a say in your company. This includes shareholders,
        signatories/power of attorney. Check our guide below to see which one applies to your
        company.
      </p>

      <div>
        {stakeholders.map((item, index) => {
          return editableStakeholder === index ? (
            <StakeholderStepper
              {...item}
              key={item.id}
              index={editableStakeholder}
              deleteStakeholder={handleDeleteStakeholder}
              isNewStakeholder={isNewStakeholder}
              orderIndex={index}
            />
          ) : (
            <FilledStakeholderCard
              {...item}
              key={item.id}
              index={index}
              changeEditableStep={editStakeholderHandler}
            />
          );
        })}
      </div>

      {isShowingAddButton && (
        <div className={classes.buttonsWrapper}>
          <AddStakeholderButton handleClick={props.addNewStakeholder} />
        </div>
      )}

      {!!stakeholders.length && isLowPercentage && <ErrorMessage error={errorMessage} />}

      <div className="linkContainer">
        <BackLink path={routes.companyInfo} />

        <SubmitButton
          handleClick={goToFinalQuestions}
          label="Next Step"
          justify="flex-end"
          disabled={isDisableNextStep}
        />
      </div>
      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        handler={props.confirmHandler}
        handleClose={props.closeConfirmDialog}
        id="Stakeholder.message"
      />
    </>
  );
};

const mapStateToProps = state => {
  const {
    isNewStakeholder,
    isConfirmDialogOpen,
    editableStakeholder,
    stakeholdersIds
  } = stakeholdersState(state);
  return {
    isNewStakeholder,
    isConfirmDialogOpen,
    editableStakeholder,
    stakeholdersIds,
    stakeholders: stakeholdersSelector(state),
    percentage: percentageSelector(state),
    ...getSendProspectToAPIInfo(state)
  };
};

const mapDispatchToProps = {
  addNewStakeholder,
  deleteStakeholder,
  sendProspectToAPI,
  openConfirmDialog,
  confirmHandler,
  closeConfirmDialog,
  editStakeholder
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyStakeholders);
