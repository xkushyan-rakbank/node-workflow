import React, { useCallback, useState } from "react";
import { connect } from "react-redux";

import { FilledStakeholderCard } from "./components/FilledStakeholderCard/FilledStakeholderCard";
import { StakeholderStepper } from "./components/StakeholderStepper/StakeholderStepper";
import { AddStakeholderButton } from "./components/AddStakeholderButton/AddStakeholderButton";
import { ErrorMessage } from "../../components/Notifications";
import { SubmitButton } from "../../components/Buttons/SubmitButton";
import { BackLink } from "../../components/Buttons/BackLink";
import { ConfirmDialog } from "../../components/Modals";
import routes from "../../routes";
import {
  changeEditableStakeholder,
  createNewStakeholder,
  deleteStakeholder
} from "../../store/actions/stakeholders";
import { resetProspect } from "../../store/actions/appConfig";
import { getSendProspectToAPIInfo } from "../../store/selectors/appConfig";
import { sendProspectToAPI } from "../../store/actions/sendProspectToAPI";
import {
  stakeholdersSelector,
  stakeholdersState,
  percentageSelector
} from "../../store/selectors/stakeholder";
import { useStyles } from "./styled";

const MAX_STAKEHOLDERS_LENGTH = 6;

const CompanyStakeholders = ({
  deleteStakeholder: deleteHandler,
  changeEditableStakeholder,
  createNewStakeholder,
  editableStakeholder,
  stakeholders,
  percentage,
  history,
  resetProspect
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isNewStakeholder, setIsNewStakeholder] = useState(false);

  const isLowPercentage = percentage < 100;
  const isShowingAddButton = stakeholders.length < MAX_STAKEHOLDERS_LENGTH;
  const isDisableNextStep = (stakeholders.length < 1 && !!editableStakeholder) || isLowPercentage;
  const errorMessage = `Shareholders ${percentage}% is less than 100%, either add a new stakeholder
  or edit the shareholding % for the added stakeholders.`;

  const goToFinalQuestions = () => history.push(routes.finalQuestions);

  const handleDeleteStakeholder = useCallback(id => deleteHandler(id), [deleteHandler]);

  const editStakeholderHandler = useCallback(
    index => {
      if (editableStakeholder) {
        resetProspect();
      }
      changeEditableStakeholder(index);
      setIsNewStakeholder(false);
    },
    [changeEditableStakeholder, editableStakeholder, resetProspect]
  );

  const addNewStakeholder = () => {
    if (editableStakeholder) {
      setOpen(true);
    } else {
      setIsNewStakeholder(true);
      createNewStakeholder();
    }
  };

  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    resetProspect();
    createNewStakeholder();
    setOpen(false);
  };

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
          <AddStakeholderButton handleClick={addNewStakeholder} />
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
        isOpen={open}
        handleConfirm={handleConfirm}
        handleClose={handleClose}
        id="Stakeholder.message"
      />
    </>
  );
};

const mapStateToProps = state => {
  const { editableStakeholder, stakeholdersIds } = stakeholdersState(state);
  return {
    editableStakeholder,
    stakeholdersIds,
    stakeholders: stakeholdersSelector(state),
    percentage: percentageSelector(state),
    ...getSendProspectToAPIInfo(state)
  };
};

const mapDispatchToProps = {
  deleteStakeholder,
  sendProspectToAPI,
  createNewStakeholder,
  changeEditableStakeholder,
  resetProspect
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyStakeholders);
