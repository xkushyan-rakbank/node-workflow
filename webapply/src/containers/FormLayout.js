import { withStyles } from "@material-ui/core/styles";
import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import FormNavigation from "../components/FormNavigation";
import ApplicationStatus from "../components/ApplicationStatus";
import ErrorMessageAlert from "../components/ErrorMessageAlert";
import { Layout, LayoutContext } from "../components/Layout";
import Header from "./../components/Header";
import HeaderTitle from "./../components/HeaderTitle";
import {
  applicationStatusReset,
  applicationStatusServerError
} from "./../store/actions/applicationStatus";
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
      routerToAddPaddingInSlider.includes(location.pathname) ? "0" : "35px 0 0",
    paddingTop: "35px"
  },
  mainContainerFullHeight: {
    padding: "0 50px 0"
  }
};

class FormLayout extends React.Component {
  constructor(props) {
    super(props);

    props.history.listen((location, action) => {
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

  handleClick = () => this.props.applicationStatusReset();

  render() {
    const { children, classes, isProceed, serverError, screeningResults, location } = this.props;

    return (
      <Layout>
        <Header />
        <div className={classes.formLayout}>
          <LayoutContext.Consumer>
            {({ accountType }) => <FormNavigation accountType={accountType} />}
          </LayoutContext.Consumer>
          <div className={classes.formWrapper}>
            <div className={classes.formInner}>
              <div className={classes.mainContainer}>
                {!routerToAddPaddingInSlider.includes(location.pathname) && <HeaderTitle />}

                <ErrorMessageAlert isVisible={serverError} handleClick={this.handleClick} />

                {!isProceed ? <ApplicationStatus statusFromServer={screeningResults} /> : children}
              </div>
            </div>
          </div>
        </div>
      </Layout>
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
  applicationStatusServerError,
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
