import { withStyles } from "@material-ui/core/styles";
import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import { history } from "./../store/configureStore";
import FormNavigation from "../components/FormNavigation";
import ApplicationStatus from "../components/ApplicationStatus";
import Header from "./../components/Header";
import { applicationStatusReset } from "./../store/actions/applicationStatus";
import { updateViewId } from "./../store/actions/appConfig";
import {
  getProceedStatus,
  getServerErrorStatus,
  getScreeningResults
} from "../store/selectors/appConfig";
import { routerToAddPaddingInSlider } from "../constants/styles";

const styles = {
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
    margin: "0 auto",
    padding: ({ location }) =>
      routerToAddPaddingInSlider.includes(location.pathname) ? "0px 50px 0" : "165px 50px 20px",
    "@media only screen and (max-width: 1360px)": {
      maxWidth: "830px",
      paddingTop: "100px",
      paddingLeft: "25px",
      paddingRight: "25px"
    }
  },
  mainContainerFullHeight: {
    padding: "0 50px 0"
  }
};

class FormLayout extends React.Component {
  constructor(props) {
    super(props);
    history.listen((location, action) => {
      this.props.applicationStatusReset();
    });
  }

  componentDidUpdate(prevProps) {
    const {
      location: { key, pathname }
    } = this.props;
    if (prevProps.location.key !== key) {
      this.props.updateViewId(pathname);
    }
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
  isProceed: getProceedStatus(state),
  serverError: getServerErrorStatus(state),
  screeningResults: getScreeningResults(state)
});

const mapDispatchToProps = {
  applicationStatusReset,
  updateViewId
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(FormLayout);
