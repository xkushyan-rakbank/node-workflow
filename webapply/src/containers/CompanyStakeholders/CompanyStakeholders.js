import React, { useCallback, useState, useEffect, useContext } from "react";
import { connect } from "react-redux";

import { StakeholderStepper } from "./components/StakeholderStepper/StakeholderStepper";
import { StakeholdersNamesContext } from "./components/StakeholdersNameProvider/StakeholdersNameProvider";
import { AddStakeholderButton } from "./components/AddStakeholderButton/AddStakeholderButton";
import { ContexualHelp, ErrorMessage } from "../../components/Notifications";
import { NextStepButton } from "../../components/Buttons/NextStepButton";
import { BackLink } from "../../components/Buttons/BackLink";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { Icon, ICONS } from "../../components/Icons";
import {
  changeEditableStakeholder,
  createNewStakeholder,
  deleteStakeholder
} from "../../store/actions/stakeholders";
import { sendProspectToAPIPromisify } from "../../store/actions/sendProspectToAPI";
import {
  stakeholdersSelector,
  stakeholdersState,
  checkIsHasSignatories,
  percentageSelector
} from "../../store/selectors/stakeholder";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import routes from "../../routes";
import { formStepper, NEXT, MAX_STAKEHOLDERS_LENGTH } from "../../constants";

import { useStyles } from "./styled";

const CompanyStakeholdersComponent = ({
  deleteStakeholder: deleteHandler,
  changeEditableStakeholder,
  createNewStakeholder,
  stakeholders,
  percentage,
  stakeholdersIds,
  hasSignatories,
  sendProspectToAPI,
  isLoading
}) => {
  const pushHistory = useTrackingHistory();
  const classes = useStyles();

  const { setStakeholderFullNames } = useContext(StakeholdersNamesContext);
  const [isShowingAddButton, setIsShowingAddButton] = useState(
    stakeholders.length > 0 && stakeholders.length < MAX_STAKEHOLDERS_LENGTH
  );

  useFormNavigation([false, true, formStepper]);

  useEffect(() => {
    if (!stakeholders.length) {
      createNewStakeholder();
    }
  }, [createNewStakeholder, stakeholders.length]);

  useEffect(() => {
    setStakeholderFullNames(stakeholders);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLowPercentage = percentage < 100;
  const isDisableNextStep =
    stakeholders.length < 1 ||
    !stakeholdersIds.every(stakeholder => stakeholder.done) ||
    isLowPercentage ||
    !hasSignatories;

  const goToFinalQuestions = useCallback(() => {
    sendProspectToAPI(NEXT).then(isScreeningError => {
      if (!isScreeningError) pushHistory(routes.finalQuestions, true);
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

  const addNewStakeholder = useCallback(() => {
    setIsShowingAddButton(false);
    createNewStakeholder();
  }, [setIsShowingAddButton, createNewStakeholder]);

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
          title={
            <>
              This stakeholder should be defined / mentioned in valid legal document of the Company.
              <br />
              <b>Examples:</b>
              <br />- Sole Proprietorship Company &gt; Trade License
              <br />- Partnership Company &gt; Trade License / Partners agreement / Share
              Certificate, etc
              <br />- Limited Liability Company (LLC) &gt; Trade License / Memorandum of Association
              / Articles of Association, etc
            </>
          }
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
          return (
            <StakeholderStepper
              setIsShowingAddButton={setIsShowingAddButton}
              {...item}
              key={item.id}
              index={index}
              deleteStakeholder={
                stakeholders.length !== 1 || isEditInProgress ? handleDeleteStakeholder : null
              }
              orderIndex={index}
              isEditInProgress={isEditInProgress}
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

        <NextStepButton
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
  const { stakeholdersIds } = stakeholdersState(state);

  return {
    isLoading: state.sendProspectToAPI.loading,
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
  sendProspectToAPI: sendProspectToAPIPromisify
};

export const CompanyStakeholdersScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyStakeholdersComponent);
