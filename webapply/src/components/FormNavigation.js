import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import FormNavigationStep from "./FormNavigationStep";
import Chat from "./Chat";
import { formStepper, searchProspectStepper } from "./../constants";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import SubmitButton from "./Buttons/SubmitButton";
import * as loginSelector from "./../store/selectors/loginSelector";
import {
  sideNavWidthXL,
  sideNavWidthLG,
  sideNavWidthMD,
  sideNavWidthSM,
  portraitOrientationQueryIPads
} from "../constants/styles";

const style = {
  formNav: {
    flex: `0 0 ${sideNavWidthXL}px`,
    position: "relative",
    paddingTop: "170px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right center",
    zIndex: "11",
    "@media only screen and (max-width: 1420px)": {
      flex: `0 0 ${sideNavWidthLG}px`
    },
    "@media only screen and (max-width: 1300px)": {
      flex: `0 0 ${sideNavWidthMD}px`
    },
    "@media only screen and (max-width: 1220px)": {
      flex: `0 0 ${sideNavWidthSM}px`
    },
    [portraitOrientationQueryIPads]: {
      paddingTop: "270px"
    },
    "& ul": {
      margin: "0",
      padding: "5px 0 0 20px",
      marginLeft: "80px",
      height: "271px",
      overflowY: "auto",
      direction: "rtl",
      "@media only screen and (max-width: 1300px)": {
        marginLeft: "40px"
      },
      "&::-webkit-scrollbar": {
        width: "2px",
        height: "5px"
      },
      "&::-webkit-scrollbar-track": {
        webkitBoxShadow: "inset 0 0 1px rgba(255,255,255, 0.4)",
        backgroundColor: "rgba(255,255,255, 0.4)"
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#fff",
        outline: "1px solid red"
      },
      "& li": {
        direction: "ltr"
      }
    }
  },
  contentContainer: {
    width: 340,
    marginLeft: 80,
    height: 323,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "@media only screen and (max-width: 1300px)": {
      marginLeft: 40,
      width: "auto"
    },
    "@media only screen and (max-width: 1220px)": {
      marginLeft: 20
    }
  },
  sectionTitle: {
    color: "#fff",
    fontSize: "48px",
    lineHeight: "1.17",
    fontWeight: 600,
    "@media only screen and (max-width: 1300px)": {
      paddingRight: "16px",
      fontSize: "40px"
    },
    "@media only screen and (max-width: 1220px)": {
      fontSize: "30px"
    }
  },
  sectionSubtitle: {
    fontSize: "16px",
    lineHeight: "1.5",
    color: "#fff",
    marginTop: 20,
    display: "block",
    fontWeight: "normal",
    "@media only screen and (max-width: 1220px)": {
      paddingRight: "25px"
    }
  },
  nextButton: {
    width: "238px"
  }
};

const accountInfo = {
  RAKStarter: {
    title: "RAKstarter account",
    subtitle: "A new zero balance account, for the budding entrepreneurs out there"
  },
  "Current Account": {
    title: "Business Current Account",
    subtitle: "Our most flexible account for growing businesses."
  },
  RAKelite: {
    title: "RAKelite  business account",
    subtitle: "Our most exclusive account, for our most exclusive clients."
  }
};

const AccountInfo = ({ classes, accountType, history }) => {
  const { location: { pathname } = {} } = history;
  const handleClick = path => history.push(path);
  const isApplicationOverview = pathname === "/ApplicationOverview";
  return (
    <div className={classes.contentContainer}>
      {accountType && pathname !== "/ApplicationOverview" ? (
        <>
          <div>
            <Typography variant="h2" component="h2" classes={{ root: classes.sectionTitle }}>
              {accountInfo[accountType].title}
            </Typography>
            <Typography
              variant="subtitle1"
              component="span"
              classes={{ root: classes.sectionSubtitle }}
            >
              {accountInfo[accountType].subtitle}
            </Typography>
          </div>
          <SubmitButton
            justify="flex-start"
            label="Apply now"
            handleClick={() => handleClick("/ApplicationOverview")}
          />
        </>
      ) : (
        <Typography variant="h2" component="h2" classes={{ root: classes.sectionTitle }}>
          {isApplicationOverview
            ? "Opening an account has never been this simple."
            : "All businesses start with an account. Get yours now."}
          {isApplicationOverview && (
            <SubmitButton
              justify="flex-start"
              label="Start application"
              handleClick={() => handleClick("/ApplicantInfo")}
              classes={{ nextButton: classes.nextButton }}
            />
          )}
        </Typography>
      )}
    </div>
  );
};

const FormStepper = ({ step, path, checkLoginStatus }) =>
  checkLoginStatus ? (
    <ul>
      {searchProspectStepper.map(item => (
        <FormNavigationStep
          key={item.step}
          title={item.title}
          activeStep={path === item.path || path === item.relatedPath}
          filled={step > item.step}
        />
      ))}
    </ul>
  ) : (
    <ul>
      {formStepper.map(item => (
        <FormNavigationStep
          key={item.step}
          title={item.title}
          activeStep={path === item.path || path === item.relatedPath}
          filled={step > item.step}
        />
      ))}
    </ul>
  );

const getBgImage = (accountType, islamicBanking) => {
  const bgImageUrl =
    accountType === "RAKelite"
      ? "bg-blob-brown.png"
      : islamicBanking
      ? "bg-blob-green.png"
      : "bg-blob-red.png";
  const bgImage = require(`../assets/images/${bgImageUrl}`);
  return `url(${bgImage})`;
};

class FormNavigation extends React.Component {
  state = {
    step: (this.getRouteConfig() || {}).step || 1
  };

  componentDidUpdate(prevProps) {
    const { location } = this.props;

    if (prevProps.location.key !== location.key) {
      this.updateStepState();
    }
  }

  getRouteConfig() {
    const {
      location: { pathname }
    } = this.props;
    return formStepper.find(item => [item.path, item.relatedPath].some(path => pathname === path));
  }

  updateStepState() {
    const { step = 1 } = this.getRouteConfig() || {};
    if (step !== this.state.step) {
      this.setState({ step });
    }
  }

  render() {
    const { applicationInfo = {}, location, classes, history, checkLoginStatus } = this.props;
    const { step } = this.state;
    const { accountType, islamicBanking } = applicationInfo;
    const showAccountInfo = new Set([
      "/AccountsComparison",
      "/DetailedAccount",
      "/ApplicationOverview"
    ]).has(location.pathname);
    const backgroundImage = getBgImage(accountType, islamicBanking);

    return (
      <div className={classes.formNav} style={{ backgroundImage }}>
        {showAccountInfo ? (
          <AccountInfo classes={classes} accountType={accountType} history={history} />
        ) : (
          location.pathname !== "/Login" && (
            <FormStepper step={step} path={location.pathname} checkLoginStatus={checkLoginStatus} />
          )
        )}
        {!checkLoginStatus && <Chat />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  applicationInfo: state.appConfig.prospect.applicationInfo,
  checkLoginStatus: loginSelector.checkLoginStatus(state)
});

export default compose(
  connect(mapStateToProps),
  withStyles(style),
  withRouter
)(FormNavigation);
