import React from "react";
import get from "lodash/get";
import uniqueId from "lodash/uniqueId";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import FilledStakeholderCard from "../components/FilledStakeholderCard";
import StakeholderStepper from "./StakeholderStepper";
import AddStakeholderButton from "../components/Buttons/AddStakeholderButton";
import SubmitButton from "../components/Buttons/SubmitButton";
import BackLink from "../components/Buttons/BackLink";
import ConfirmDialog from "../components/ConfirmDialod";
import routes from "../routes";
import {
  addNewStakeholder,
  deleteStakeholder,
  editStakeholder,
  openConfirmDialog,
  closeConfirmDialog,
  confirmHandler
} from "../store/actions/stakeholders";
import { getSendProspectToAPIInfo } from "../store/selectors/appConfig";
import { sendProspectToAPI } from "../store/actions/sendProspectToAPI";

const style = {
  buttonStyle: {
    width: "346px",
    height: "56px",
    borderRadius: "28px",
    textTransform: "none",
    fontSize: "18px",
    padding: "0 20px 0 32px",
    fontWeight: "normal",
    letterSpacing: "normal",
    justifyContent: "space-between"
  },
  buttonsWrapper: {
    borderRadius: "8px",
    boxShadow: "0 5px 21px 0 rgba(0, 0, 0, 0.03)",
    border: "solid 1px #e8e8e8",
    backgroundColor: "#ffffff",
    flexDirection: "column",
    marginTop: "24px"
  }
};

const CompanyStakeholders = props => {
  const goToFinalQuestions = () => props.history.push(routes.finalQuestions);
  const {
    stakeholders,
    editableStakeholder,
    classes,
    isConfirmDialogOpen,
    isNewStakeholder
  } = props;
  const showingAddButton = stakeholders.length < 6;

  return (
    <>
      <h2>Add your company’s stakeholders</h2>
      <p className="formDescription">
        Now we need to know about those who have a say in your company. This includes shareholders,
        signatories and some others. Check our guide below to see which one applies to your company.
      </p>

      <div>
        {stakeholders.map((item, index) => {
          const handleDeleteStakeholder = () => {
            props.deleteStakeholder(item.signatoryId);
          };
          const key = uniqueId(index);
          const editStakeholderHandler = () => props.editStakeholder(index);
          return editableStakeholder === index ? (
            <StakeholderStepper
              {...item}
              key={key}
              index={editableStakeholder}
              deleteStakeholder={handleDeleteStakeholder}
              isNewStakeholder={isNewStakeholder}
            />
          ) : (
            <FilledStakeholderCard
              {...item}
              key={key}
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

      <div className="linkContainer">
        <BackLink path={routes.companyInfo} />

        <SubmitButton
          handleClick={goToFinalQuestions}
          label="Next Step"
          justify="flex-end"
          disabled={stakeholders.length < 1 && !!editableStakeholder}
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

const mapStateToProps = state => ({
  isNewStakeholder: state.stakeholders.isNewStakeholder,
  isConfirmDialogOpen: state.stakeholders.isConfirmDialogOpen,
  editableStakeholder: state.stakeholders.editableStakeholder,
  stakeholders: get(state, "appConfig.prospect.signatoryInfo", []),
  ...getSendProspectToAPIInfo(state)
});

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
  withStyles(style),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CompanyStakeholders);
