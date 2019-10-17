import React from "react";
import get from "lodash/get";
import { withStyles } from "@material-ui/core";
import { compose } from "recompose";
import { connect } from "react-redux";
import FilledStakeholderCard from "../components/FilledStakeholderCard";
import StakeholderStepper from "./StakeholderStepper";
import AddStakeholderButton from "../components/Buttons/AddStakeholderButton";
import SubmitButton from "../components/Buttons/SubmitButton";
import BackLink from "../components/Buttons/BackLink";
import routes from "../routes";
import { updateProspect } from "../store/actions/appConfig";
import { addNewStakeholder, deleteStakeholder } from "../store/actions/stakeholders";
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

class CompanyStakeholders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFinalScreenShown: false,
      showNewStakeholder: false,
      editableStakeholder: null,
      step: 1,
      completedStep: 0
    };
  }

  goToFinalQuestions = () => this.props.history.push(routes.finalQuestions);

  showNewStakeholder = () => {
    this.setState({
      showNewStakeholder: true,
      editableStakeholder: this.props.stakeholders.length
    });
    this.props.addNewStakeholder();
  };

  hideNewStakeholder = () => {
    this.setState({ showNewStakeholder: false, editableStakeholder: null });
  };

  changeEditableStep = stakeholderIndex =>
    this.setState({ editableStakeholder: stakeholderIndex, showNewStakeholder: false });

  render() {
    const { editableStakeholder, showNewStakeholder } = this.state;
    const { stakeholders, classes } = this.props;
    const showingAddButton = stakeholders.length < 6;
    return (
      <>
        <h2>Add your company’s stakeholders</h2>
        <p className="formDescription">
          Now we need to know about those who have a say in your company. This includes
          shareholders, signatories and some others. Check our guide below to see which one applies
          to your company.
        </p>

        <div>
          {stakeholders.map((item, index) => {
            const deleteStakeholder = () => {
              this.props.deleteStakeholder(item.signatoryId);
              this.setState({ editableStakeholder: null });
            };
            return editableStakeholder === index ? (
              <StakeholderStepper
                {...item}
                hideForm={this.hideNewStakeholder}
                index={editableStakeholder}
                key={index}
                deleteStakeholder={deleteStakeholder}
                showNewStakeholder={showNewStakeholder}
              />
            ) : (
              <FilledStakeholderCard
                {...item}
                index={index}
                changeEditableStep={this.changeEditableStep}
                key={`${item.id}-${index}`}
              />
            );
          })}
        </div>

        {showingAddButton && (
          <div className={classes.buttonsWrapper}>
            <AddStakeholderButton handleClick={this.showNewStakeholder} />
          </div>
        )}

        <div className="linkContainer">
          <BackLink path={routes.companyInfo} />

          <SubmitButton
            handleClick={this.goToFinalQuestions}
            label="Next Step"
            justify="flex-end"
            disabled={stakeholders.length < 1 && !!editableStakeholder}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  stakeholders: get(state, "appConfig.prospect.signatoryInfo", []),
  ...getSendProspectToAPIInfo(state)
});

const mapDispatchToProps = {
  updateProspect,
  addNewStakeholder,
  deleteStakeholder,
  sendProspectToAPI
};

export default compose(
  withStyles(style),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CompanyStakeholders);
