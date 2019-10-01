import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import * as getSearchResult from "./../store/selectors/searchProspect";
import CompanyStakeholderCard from "../components/CompanyStakeholderCard";
import StepComponent from "../components/StepComponent";
import { searchedAppInfoSteps } from "../constants";
import routes from "../routes";
import SubmitButton from "../components/Buttons/SubmitButton";
import * as loginSelector from "./../store/selectors/loginSelector";
import { history } from "./../store/configureStore";

const styles = {
  sectionTitleIndent: {
    marginBottom: "24px"
  },
  topIndent: {
    marginTop: "40px"
  },
  title: {
    marginLeft: "20px",
    fontSize: "20px",
    fontWeight: 600,
    color: "#373737"
  },
  buttonContainer: {
    float: "right"
  }
};

class SearchedAppInfo extends React.Component {
  static defaultProps = {
    index: 0
  };

  state = {
    step: 1
  };

  componentWillMount() {
    !this.props.checkLoginStatus && history.push(routes.login);
  }

  handleContinue = () => {
    if (this.state.step < searchedAppInfoSteps.length) {
      this.props.aboutCompany();
      this.setState(state => ({ step: state.step + 1 }));
    } else {
      this.props.history.push(routes.stakeholdersInfo);
    }
  };

  render() {
    const { classes, index } = this.props;
    const { step } = this.state;

    return (
      <>
        <h2>Application Details</h2>
        <p className="formDescription"></p>
        <CompanyStakeholderCard
          content={
            <>
              <div className={classes.title}>Applicant&apos;s Name</div>
            </>
          }
        >
          <div className={classes.formContent}>
            {searchedAppInfoSteps.map(item => {
              const setStep = () => this.setState({ step: item.step });
              return (
                <StepComponent
                  index={index}
                  key={item.step}
                  steps={searchedAppInfoSteps}
                  step={item.step}
                  title={item.title}
                  subTitle={item.infoTitle}
                  active={step === item.step}
                  filled={step > item.step}
                  clickHandler={setStep}
                  handleContinue={this.handleContinue}
                  hideContinue={true}
                />
              );
            })}
          </div>
        </CompanyStakeholderCard>
        <div className={classes.buttonContainer}>
          <SubmitButton label={"Edit"} />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  searchResults: getSearchResult.getSearchResult(state),
  checkLoginStatus: loginSelector.checkLoginStatus(state)
});

const mapDispatchToProps = {};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchedAppInfo)
);
