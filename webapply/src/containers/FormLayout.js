import { withStyles } from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import { history } from "./../store/configureStore";
import FormNavigation from "../components/FormNavigation";
import ApplicationStatus from "../components/ApplicationStatus";
import Header from "./../components/Header";
import { applicationStatusReset } from "./../store/actions/applicationStatus";
import * as appConfigSelectors from "../store/selectors/appConfig";

const style = {
  formLayout: {
    display: "flex",
    height: "100%",
    "@media only screen and (max-width: 1100px)": {}
  },
  formWrapper: {
    flexBasis: "0%",
    flex: "1 1 auto",
    minHeight: "0px",
    "& h2": {
      fontSize: "46px",
      fontWeight: "600",
      marginBottom: "20px",
      marginTop: "0",
      color: "#373737",
      "@media only screen and (max-width: 1100px)": {
        fontSize: "27px"
      }
    }
  },
  formInner: {
    display: "flex",
    height: "100%",
    overflowY: "auto",
    "& nextButton": {
      margin: "42px 0 0 !important"
    }
  },
  mainContainer: {
    maxWidth: "780px",
    width: "100%",
    margin: "auto",
    padding: "90px 50px 20px"
  }
};

class FormLayout extends React.Component {
  constructor(props) {
    super(props);
    history.listen((location, action) => {
      this.props.applicationStatusReset();
    });
  }
  render() {
    const { children, classes, isProceed, serverError, screeningResults } = this.props;

    return (
      <React.Fragment>
        <Header />
        <div className={classes.formLayout}>
          <FormNavigation />
          <div className={classes.formWrapper}>
            <div className={classes.formInner}>
              <div className={classes.mainContainer}>
                {isProceed ? (
                  children
                ) : (
                  <ApplicationStatus serverError={serverError} errorReason={screeningResults} />
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isProceed: appConfigSelectors.getProceedStatus(state),
  serverError: appConfigSelectors.getServerErrorStatus(state),
  screeningResults: appConfigSelectors.getScreeningResults(state)
});

const mapDispatchToProps = {
  applicationStatusReset
};

export default withStyles(style)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FormLayout)
);
