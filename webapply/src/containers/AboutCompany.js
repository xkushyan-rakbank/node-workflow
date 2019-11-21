import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { differenceInYears } from "date-fns";
import CompanyStakeholderCard from "../components/CompanyStakeholderCard";
import StepComponent from "../components/StepComponent";
import StatusLoader from "../components/StatusLoader";
import SubmitButton from "../components/Buttons/SubmitButton";
import ApplicationStatus from "../components/ApplicationStatus";
import { sendProspectToAPI, startProspectAutoSave } from "../store/actions/sendProspectToAPI";
import {
  getSendProspectToAPIInfo,
  getOrganizationInfo,
  getApplicationInfo
} from "../store/selectors/appConfig";
import { aboutCompanySteps } from "../constants";
import companyInfoIcon from "./../assets/icons/companyInfo.png";
import routes from "./../routes";
import { applicationStatus } from "./../constants/index";

const style = {
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
  }
};

class AboutCompany extends React.Component {
  state = {
    step: 1,
    completedStep: 0,
    isEligibleUser: false
  };

  componentDidMount() {
    this.props.startProspectAutoSave();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.resetStep && this.props.resetStep) {
      this.setState(state => {
        const nextStep = state.step + 1;
        return {
          step: nextStep,
          completedStep: state.step
        };
      });
    }
  }

  handleClick = () => this.props.history.push(routes.stakeholdersInfo);

  setStep = item => {
    if (this.state.completedStep >= item.step) {
      this.setState({ step: item.step });
    }
  };

  sendProspectToAPI = () => {
    const {
      organizationInfo: { licenseIssueDate },
      applicationInfo: { accountType }
    } = this.props;

    if (licenseIssueDate) {
      const yearsDifference = differenceInYears(new Date(), licenseIssueDate);
      const isEligibleYears = yearsDifference < 1 ? true : false;
      const isEligibleAccount = accountType !== "RAKstarter" ? true : false;

      this.setState({
        isEligibleUser: isEligibleYears && isEligibleAccount
      });
    }

    this.props.sendProspectToAPI();
  };

  render() {
    const {
      classes,
      index,
      loading,
      organizationInfo: { companyName }
    } = this.props;
    const { step, completedStep, isEligibleUser } = this.state;
    const disabled = completedStep === aboutCompanySteps.length;

    return (
      <>
        {!isEligibleUser && completedStep === 3 ? (
          <ApplicationStatus status={applicationStatus.notEligible} linkToProducts={true} />
        ) : (
          <>
            <h2>Tell Us about Your Company</h2>
            <p className="formDescription">
              Explanation text goes here. One to three short sentences maximum. This is the third
              sentence.
            </p>

            <CompanyStakeholderCard
              content={
                <>
                  <div className={classes.title}>
                    {completedStep >= 1 ? companyName : "Company Name"}
                  </div>
                  {loading && <StatusLoader />}
                </>
              }
              defaultAvatarIcon={companyInfoIcon}
            >
              <div className={classes.formContent}>
                {aboutCompanySteps.map(item => {
                  const setStep = () => this.setStep(item);
                  const isFilled = this.state.completedStep >= item.step;
                  return (
                    <StepComponent
                      index={index}
                      key={item.step}
                      steps={aboutCompanySteps}
                      step={item.step}
                      title={item.title}
                      subTitle={item.infoTitle}
                      activeStep={step === item.step}
                      stepForm={item.component}
                      filled={isFilled}
                      clickHandler={setStep}
                      handleContinue={this.sendProspectToAPI}
                    />
                  );
                })}
              </div>
            </CompanyStakeholderCard>

            <div className="linkContainer">
              <SubmitButton
                label="Next Step"
                justify="flex-end"
                disabled={!disabled}
                handleClick={this.handleClick}
              />
            </div>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  ...getSendProspectToAPIInfo(state),
  organizationInfo: getOrganizationInfo(state),
  applicationInfo: getApplicationInfo(state)
});

const mapDispatchToProps = {
  sendProspectToAPI,
  startProspectAutoSave
};

export default withStyles(style)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AboutCompany)
);
