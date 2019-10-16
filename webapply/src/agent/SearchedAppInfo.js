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
import BackLink from "../components/Buttons/BackLink";
import { retrieveDocDetails } from "./../store/actions/getProspectDocuments";
import { getProspectInfo } from "./../store/actions/retrieveApplicantInfo";

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
    this.props.searchResults.length === 0 && history.push(routes.searchProspect);
  }

  componentDidMount() {
    this.props.retrieveDocDetails();
  }

  redirectUserPage = () => {
    this.props.getProspectInfo(this.props.match.params.id);
  };

  render() {
    const { classes, index, searchResults, match } = this.props;
    const { step } = this.state;

    const [prospectInfo] =
      searchResults && searchResults.searchResult
        ? searchResults.searchResult.filter(item => item.prospectId === match.params.id)
        : [];

    return prospectInfo ? (
      <>
        <h2>Application Details</h2>
        <p className="formDescription"></p>
        <CompanyStakeholderCard
          content={
            <>
              <div className={classes.title}>
                {prospectInfo.applicantInfo &&
                  prospectInfo.applicantInfo.fullName &&
                  prospectInfo.applicantInfo.fullName}
              </div>
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
                  activeStep={step === item.step}
                  filled={false}
                  clickHandler={setStep}
                  hideContinue={true}
                  prospectInfo={prospectInfo}
                />
              );
            })}
          </div>
        </CompanyStakeholderCard>
        <div className="linkContainer">
          <BackLink path={routes.searchProspect} />
          <SubmitButton label={"Edit"} justify="flex-end" handleClick={this.redirectUserPage} />
        </div>
      </>
    ) : (
      <></>
    );
  }
}

const mapStateToProps = state => ({
  searchResults: getSearchResult.getSearchResult(state),
  checkLoginStatus: loginSelector.checkLoginStatus(state)
});

const mapDispatchToProps = {
  retrieveDocDetails,
  getProspectInfo
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchedAppInfo)
);
