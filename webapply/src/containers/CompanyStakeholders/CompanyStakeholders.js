import React, { useCallback, useState, useEffect } from "react";
import { connect } from "react-redux";

import { FilledStakeholderCard } from "./components/FilledStakeholderCard/FilledStakeholderCard";
import { StakeholderStepper } from "./components/StakeholderStepper/StakeholderStepper";
import { AddStakeholderButton } from "./components/AddStakeholderButton/AddStakeholderButton";
import { ContexualHelp, ErrorMessage } from "../../components/Notifications";
import { SubmitButton } from "../../components/Buttons/SubmitButton";
import { BackLink } from "../../components/Buttons/BackLink";
import { Icon, ICONS } from "../../components/Icons";

import {
  changeEditableStakeholder,
  createNewStakeholder,
  deleteStakeholder,
  setEditStakeholder
} from "../../store/actions/stakeholders";
import { sendProspectToAPIPromisify } from "../../store/actions/sendProspectToAPI";
import { getDatalist } from "../../store/selectors/appConfig";
import {
  stakeholdersSelector,
  stakeholdersState,
  checkIsHasSignatories,
  percentageSelector
} from "../../store/selectors/stakeholder";
import routes from "../../routes";
import { NEXT } from "../../constants";
import { MAX_STAKEHOLDERS_LENGTH } from "./../../constants";
import { useStyles } from "./styled";
import { useTrackingHistory } from "../../utils/useTrackingHistory";

const CompanyStakeholdersComponent = ({
  deleteStakeholder: deleteHandler,
  changeEditableStakeholder,
  createNewStakeholder,
  editableStakeholder,
  stakeholders,
  percentage,
  stakeholdersIds,
  hasSignatories,
  datalist,
  sendProspectToAPI,
  isLoading,
  setEditStakeholder
}) => {
  const pushHistory = useTrackingHistory();
  const classes = useStyles();

  const [isShowingAddButton, setIsShowingAddButton] = useState(
    stakeholders.length > 0 && stakeholders.length < MAX_STAKEHOLDERS_LENGTH
  );
  const [isNewStakeholder, setIsNewStakeholder] = useState(false);

  // Used to show add button after add stakeholder(if it is not limit)
  const handleShowAddButton = useCallback(() => {
    setIsShowingAddButton(stakeholders.length < MAX_STAKEHOLDERS_LENGTH);
  }, [setIsShowingAddButton, stakeholders]);

  useEffect(() => {
    if (!stakeholders.length) {
      setIsNewStakeholder(true);
      createNewStakeholder();
    }
  }, [setIsNewStakeholder, createNewStakeholder, stakeholders.length]);

  const isLowPercentage = percentage < 100;
  const isDisableNextStep =
    stakeholders.length < 1 ||
    !stakeholdersIds.every(stakeholder => stakeholder.done) ||
    isLowPercentage ||
    !hasSignatories;

  const goToFinalQuestions = useCallback(() => {
    sendProspectToAPI(NEXT).then(() => {
      pushHistory(routes.finalQuestions);
    });
  }, [pushHistory, sendProspectToAPI]);

  const handleDeleteStakeholder = useCallback(
    id => {
      setIsShowingAddButton(stakeholders.length !== 1);
      changeEditableStakeholder("");
      deleteHandler(id);
    },
    [stakeholders.length, deleteHandler, setIsShowingAddButton, changeEditableStakeholder]
  );

  const editStakeholderHandler = useCallback(
    index => {
      changeEditableStakeholder(index);
      setIsNewStakeholder(false);
      setEditStakeholder(index, true);
    },
    [changeEditableStakeholder, setEditStakeholder, setIsNewStakeholder]
  );

  const addNewStakeholder = useCallback(() => {
    setIsShowingAddButton(false);
    setIsNewStakeholder(true);
    createNewStakeholder();
  }, [setIsShowingAddButton, setIsNewStakeholder, createNewStakeholder]);

  return (
    <>
      <h2>Add your company’s stakeholders</h2>
      <p className="formDescription">
        Now we need to know about the key people in your company. This includes shareholders,
        partners, signatories/Power of Attorney. Check our guide below to see which one applies to
        your company
      </p>

      <div className={classes.stakeholdersTitleWrapper}>
        <ContexualHelp
          title="This stakeholder should be defined / mentioned in valid legal document of the Company. Examples: - Sole Proprietorship Company > Trade License - Partnership Company > Trade License / Partners agreement / Share Certificate, etc - Limited Liability Company (LLC) > Trade License / Memorandum of Association / Articles of Association, etc"
          placement="right"
          isDisableHoverListener={false}
        >
          <span className={classes.questionIcon}>
            <Icon name={ICONS.question} alt="question" className={classes.iconSize} />
          </span>
        </ContexualHelp>
        <span className={classes.stakeholderTitle}>Who is a stakeholder?</span>
      </div>

      <div>
        {stakeholders.map((item, index) => {
          const isEditInProgress = stakeholdersIds.find(stakeholder => stakeholder.id === item.id)
            .isEditting;
          return editableStakeholder === index ? (
            <StakeholderStepper
              showAddButton={handleShowAddButton}
              {...item}
              key={item.id}
              index={editableStakeholder}
              deleteStakeholder={
                stakeholders.length !== 1 || isEditInProgress ? handleDeleteStakeholder : null
              }
              isNewStakeholder={isNewStakeholder}
              orderIndex={index}
              isEditInProgress={isEditInProgress}
            />
          ) : (
            <FilledStakeholderCard
              {...item}
              key={item.id}
              index={index}
              editDisabled={editableStakeholder}
              changeEditableStep={editStakeholderHandler}
              datalist={datalist}
            />
          );
        })}
      </div>
      {isShowingAddButton && !isLoading && (
        <div className={classes.buttonsWrapper}>
          <AddStakeholderButton handleClick={addNewStakeholder} />
        </div>
      )}
      {stakeholders.length > 0 && (stakeholdersIds[0].done && !hasSignatories) && (
        <ErrorMessage error="At least one signatory is required. Edit Signatory rights or Add new stakeholder." />
      )}
      {stakeholders.length > 0 && (stakeholdersIds[0].done && isLowPercentage) && (
        <ErrorMessage
          error={`Shareholders ${percentage}% is less than 100%, either add a new stakeholder
          or edit the shareholding % for the added stakeholders.`}
        />
      )}
      <div className="linkContainer">
        <BackLink path={routes.companyInfo} />

        <SubmitButton
          handleClick={goToFinalQuestions}
          label="Next Step"
          justify="flex-end"
          disabled={isDisableNextStep}
        />
      </div>
    </>
  );
};

const mapStateToProps = state => {
  const { editableStakeholder, stakeholdersIds } = stakeholdersState(state);

  return {
    isLoading: state.sendProspectToAPI.loading,
    datalist: getDatalist(state),
    editableStakeholder,
    stakeholdersIds,
    stakeholders: stakeholdersSelector(state),
    percentage: percentageSelector(state),
    hasSignatories: checkIsHasSignatories(state)
  };
};

const mapDispatchToProps = {
  deleteStakeholder,
  createNewStakeholder,
  changeEditableStakeholder,
  setEditStakeholder,
  sendProspectToAPI: sendProspectToAPIPromisify
};

export const CompanyStakeholders = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyStakeholdersComponent);
