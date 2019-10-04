import React from "react";
import cx from "classnames";
import { withStyles } from "@material-ui/core";
import FilledStakeholderCard from "../components/FilledStakeholderCard";
import StakeholderStepper from "./StakeholderStepper";
import AddStakeholderButton from "../components/Buttons/AddStakeholderButton";
import SubmitButton from "../components/Buttons/SubmitButton";
import questionMark from "../assets/icons/question_mark_grey.png";
// import Button from "@material-ui/core/Button/Button";
// import { ReactComponent as RightArrowWhite } from "./../assets/icons/whiteArrow.png";
import BackLink from "../components/Buttons/BackLink";
import routes from "../routes";
import { compose } from "recompose";
import { connect } from "react-redux";
import { updateProspect } from "../store/actions/appConfig";
import get from "lodash/get";

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
  },
  infoTitle: {
    display: "flex",
    margin: "-20px 0 60px",
    "&>img": {
      marginRight: "10px",
      alignItems: "center"
    }
  }
};

class CompanyStakeholders extends React.Component {
  constructor(props) {
    super(props);
    const stakeholders = [
      {
        id: 343453542345,
        firstName: "Christer",
        lastName: "Petterson",
        signatoryRights: true,
        shareholding: 51
      }
    ];
    this.state = {
      stakeholders,
      isFinalScreenShown: false,
      showNewStakeholder: false,
      editableStakeholder: stakeholders.length ? null : 0
    };
  }

  goToFinalQuestions = () => this.props.history.push(routes.finalQuestions);

  showNewStakeholder = () => this.setState({ showNewStakeholder: true, editableStakeholder: null });

  hideNewStakeholder = () => {
    const stakeholders = this.state.stakeholders;
    stakeholders.push(this.state.stakeholders[0]);
    this.setState({ showNewStakeholder: false, editableStakeholder: null });
  };

  changeEditableStep = stakeholderIndex =>
    this.setState({ editableStakeholder: stakeholderIndex, showNewStakeholder: false });

  deleteStakeholder = stakeholderId => {
    const newStakeholders = this.state.stakeholders.filter(item => item.id !== stakeholderId);
    this.setState({ stakeholders: newStakeholders });
  };

  render() {
    const { showNewStakeholder, editableStakeholder } = this.state;
    const { stakeholders, classes } = this.props;

    return (
      <>
        <h2>Add your company’s stakeholders</h2>
        <p className="formDescription">
          Now we need to know about those who have a say in your company. This includes
          shareholders, signatories and some others. Check our guide below to see which one applies
          to your company.
        </p>

        <div className={cx("smallText", classes.infoTitle)}>
          <img src={questionMark} alt="" />
          Who is a stakeholder?
        </div>

        <div>
          {stakeholders.map((item, index) => {
            const deleteStakeholder = () => this.deleteStakeholder(item.id);
            return editableStakeholder === index ? (
              <StakeholderStepper
                hideForm={this.hideNewStakeholder}
                index={editableStakeholder}
                key={index}
                deleteStakeholder={deleteStakeholder}
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

        {showNewStakeholder && (
          <StakeholderStepper
            hideForm={this.hideNewStakeholder}
            index={this.state.stakeholders.length}
          />
        )}

        <div className={classes.buttonsWrapper}>
          <AddStakeholderButton handleClick={this.showNewStakeholder} />
        </div>

        <div className="linkContainer">
          <BackLink path={routes.companyInfo} />

          <SubmitButton
            handleClick={this.goToFinalQuestions}
            label="Next Step"
            justify="flex-end"
            disabled
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  stakeholders: get(state, "appConfig.prospect.signatoryInfo", [])
});

const mapDispatchToProps = {
  updateProspect
};

export default compose(
  withStyles(style),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CompanyStakeholders);
