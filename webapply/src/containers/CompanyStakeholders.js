import React from "react";
import { withStyles } from "@material-ui/core";
import FilledStakeholderCard from "../components/FilledStakeholderCard";
import StakeholderStepper from "./StakeholderStepper";
import AddStakeholderButton from "../components/Buttons/AddStakeholderButton";
import Button from "@material-ui/core/Button/Button";
import { ReactComponent as RightArrowWhite } from "./../assets/images/white.svg";
import routes from "../routes";

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
    display: "flex",
    justifyContent: "space-between",
    marginTop: "40px",
    "@media (max-width: 1600px)": {
      flexDirection: "column",
      "&>button": {
        margin: "0 0 24px"
      }
    }
  }
};

class CompanyStakeholders extends React.Component {
  state = {
    stakeholders: [
      {
        id: 343453542345,
        firstName: "Christer",
        lastName: "Petterson",
        signatoryRights: true,
        shareholding: 51
      }
    ],
    isFinalScreenShown: true,
    showNewStakeholder: false
  };

  goToFinalQuestions = () => this.props.history.push(routes.finalQuestions);

  showNewStakeholder = () => this.setState({ showNewStakeholder: true });

  hideNewStakeholder = () => {
    const stakeholders = this.state.stakeholders;
    stakeholders.push(this.state.stakeholders[0]);
    this.setState({ showNewStakeholder: false });
  };

  render() {
    const { stakeholders } = this.state;
    const { classes } = this.props;
    return (
      <>
        <h2>Add Company Stakeholders</h2>
        <p className="formDescription">
          Explanation text goes here. One to three short sentences maximum. This
          is the third sentence.
        </p>

        <div>
          {stakeholders.map((item, idx) => (
            <FilledStakeholderCard {...item} key={`${item.id}-${idx}`} />
          ))}
        </div>

        {this.state.showNewStakeholder && (
          <StakeholderStepper hideForm={this.hideNewStakeholder} index={0} />
        )}
        <div className={classes.buttonsWrapper}>
          <AddStakeholderButton handleClick={this.showNewStakeholder} />
          <Button
            className={classes.buttonStyle}
            variant="contained"
            color="primary"
            onClick={this.goToFinalQuestions}
          >
            I have added all stakeholders
            <RightArrowWhite />
          </Button>
        </div>
      </>
    );
  }
}

export default withStyles(style)(CompanyStakeholders);
