import React, { useCallback, useState } from "react";
import { connect } from "react-redux";

import { FilledStakeholderCard } from "./components/FilledStakeholderCard/FilledStakeholderCard";
import { StakeholderStepper } from "./components/StakeholderStepper/StakeholderStepper";
import { AddStakeholderButton } from "./components/AddStakeholderButton/AddStakeholderButton";
import { ContexualHelp, ErrorMessage } from "../../components/Notifications";
import { SubmitButton } from "../../components/Buttons/SubmitButton";
import { BackLink } from "../../components/Buttons/BackLink";
import { ConfirmDialog } from "../../components/Modals";
import { Icon, ICONS } from "../../components/Icons";

import {
  changeEditableStakeholder,
  createNewStakeholder,
  deleteStakeholder
} from "../../store/actions/stakeholders";
import { resetProspect } from "../../store/actions/appConfig";
import { getSendProspectToAPIInfo, getDatalist } from "../../store/selectors/appConfig";
import { sendProspectToAPI } from "../../store/actions/sendProspectToAPI";
import {
  stakeholdersSelector,
  stakeholdersState,
  checkIsHasSignatories,
  percentageSelector
} from "../../store/selectors/stakeholder";
import routes from "../../routes";
import { MAX_STAKEHOLDERS_LENGTH } from "./../../constants";
import { useStyles } from "./styled";
import { GA_EVENTS } from "../../utils/ga";
import { STEP_1 } from "../FinalQuestions/components/CompanySummaryCard/constants";
import { useTrackingHistory } from "../../utils/useTrackingHistory";

const CompanyStakeholdersComponent = ({
  deleteStakeholder: deleteHandler,
  changeEditableStakeholder,
  createNewStakeholder,
  editableStakeholder,
  stakeholders,
  percentage,
  resetProspect,
  stakeholdersIds,
  hasSignatories,
  datalist,
  sendGoogleAnalyticsMetrics
}) => {
  const pushHistory = useTrackingHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isNewStakeholder, setIsNewStakeholder] = useState(false);

  const isLowPercentage = percentage < 100;
  const isShowingAddButton = stakeholders.length < MAX_STAKEHOLDERS_LENGTH;
  const isDisableNextStep =
    stakeholders.length < 1 ||
    !stakeholdersIds.every(stakeholder => stakeholder.done) ||
    isLowPercentage ||
    !hasSignatories;

  const goToFinalQuestions = useCallback(() => {
    pushHistory(routes.finalQuestions);
  }, [pushHistory, routes.finalQuestions]);

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
    sendGoogleAnalyticsMetrics(GA_EVENTS.COMPANY_STAKEHOLDER_ADD_NEW_CONTINUE);
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
          return editableStakeholder === index ? (
            <StakeholderStepper
              {...item}
              key={item.id}
              index={editableStakeholder}
              deleteStakeholder={handleDeleteStakeholder}
              isNewStakeholder={isNewStakeholder}
              orderIndex={index}
              initialStep={STEP_1}
            />
          ) : (
            <FilledStakeholderCard
              {...item}
              key={item.id}
              index={index}
              changeEditableStep={editStakeholderHandler}
              datalist={datalist}
            />
          );
        })}
      </div>

      {stakeholders.length > 0 && !hasSignatories && (
        <ErrorMessage error="At least one signatory is required. Edit Signatory rights or Add new stakeholder." />
      )}

      {isShowingAddButton && (
        <div className={classes.buttonsWrapper}>
          <AddStakeholderButton handleClick={addNewStakeholder} />
        </div>
      )}

      {!!stakeholders.length && isLowPercentage && (
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
    datalist: getDatalist(state),
    editableStakeholder,
    stakeholdersIds,
    stakeholders: stakeholdersSelector(state),
    percentage: percentageSelector(state),
    hasSignatories: checkIsHasSignatories(state),
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

export const CompanyStakeholders = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyStakeholdersComponent);
