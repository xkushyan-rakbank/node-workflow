import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import FilledStakeholderCard from "../../components/FilledStakeholderCard";
import StakeholderStepper from "../StakeholderStepper/StakeholderStepper";
import AddStakeholderButton from "../../components/Buttons/AddStakeholderButton";
import ErrorMessage from "../../components/ErrorMessage";
import SubmitButton from "../../components/Buttons/SubmitButton";
import BackLink from "../../components/Buttons/BackLink";
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
import styles from "./styled";

const MAX_STAKEHOLDERS_LENGTH = 6;

const CompanyStakeholders = props => {
  const goToFinalQuestions = () => props.history.push(routes.finalQuestions);
  const {
    stakeholders,
    editableStakeholder,
    classes,
    isConfirmDialogOpen,
    isNewStakeholder,
    percentage
  } = props;
  const showingAddButton = stakeholders.length < MAX_STAKEHOLDERS_LENGTH;
  const lowPercentage = percentage < 100;
  const disableNextStep = (stakeholders.length < 1 && !!editableStakeholder) || lowPercentage;
  const errorMessage = `Shareholders ${percentage}% is less than 100%, either add a new stakeholder
   or edit the shareholding % for the added stakeholders.`;
  const handleDeleteStakeholder = id => props.deleteStakeholder(id);
  const editStakeholderHandler = index => props.editStakeholder(index);

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

      {showingAddButton && (
        <div className={classes.buttonsWrapper}>
          <AddStakeholderButton handleClick={props.addNewStakeholder} />
        </div>
      )}

      {!!stakeholders.length && lowPercentage && <ErrorMessage error={errorMessage} />}

      <div className="linkContainer">
        <BackLink path={routes.companyInfo} />

        <SubmitButton
          handleClick={goToFinalQuestions}
          label="Next Step"
          justify="flex-end"
          disabled={disableNextStep}
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

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CompanyStakeholders);
