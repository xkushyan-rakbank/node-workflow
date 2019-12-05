import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import get from "lodash/get";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import FormNavigationStep from "./FormNavigationStep";
import Chat from "./Chat";
import { accountsNames, formStepper, searchProspectStepper, mobileResolution } from "../constants";
import { ContainedButton } from "./Buttons/ContainedButton";
import { MobileNotification } from "./Modals";
import IslamicBankingSwitcherMobile from "./IslamicBankingSwitcher/IslamicBankingSwitcherMobile";
import * as loginSelector from "./../store/selectors/loginSelector";
import {
  sideNavWidthXL,
  sideNavWidthLG,
  sideNavWidthMD,
  sideNavWidthSM,
  portraitOrientationQueryIPads
} from "../constants/styles";
import routes from "../routes";

const blobImages = {
  red: require("../assets/images/bg-blobs/bg-blob-red.png"),
  redS: require("../assets/images/bg-blobs/bg-blob-s-red.png"),
  redM: require("../assets/images/bg-blobs/bg-blob-m-red.png"),
  brown: require("../assets/images/bg-blobs/bg-blob-brown.png"),
  brownS: require("../assets/images/bg-blobs/bg-blob-s-brown.png"),
  brownM: require("../assets/images/bg-blobs/bg-blob-m-brown.png"),
  green: require("../assets/images/bg-blobs/bg-blob-green.png"),
  greenS: require("../assets/images/bg-blobs/bg-blob-s-green.png"),
  greenM: require("../assets/images/bg-blobs/bg-blob-m-green.png")
};

const style = {
  formNav: {
    flex: `0 0 ${sideNavWidthXL}px`,
    position: "relative",
    paddingTop: "170px",
    zIndex: "11",
    [portraitOrientationQueryIPads]: {
      paddingTop: "270px"
    },
    "@media only screen and (max-width: 1420px)": {
      flex: `0 0 ${sideNavWidthLG}px`
    },
    "@media only screen and (max-width: 1300px)": {
      flex: `0 0 ${sideNavWidthMD}px`
    },
    "@media only screen and (max-width: 1220px)": {
      flex: `0 0 ${sideNavWidthSM}px`
    },
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      display: "flex",
      overflow: "hidden",
      flexDirection: "column",
      transition: "all .3s",
      flex: "0 0 100%",
      height: "290px",
      paddingTop: "70px",
      marginBottom: -40,
      "&.small-bg": {
        height: "190px"
      },
      "&.open": {
        height: "calc(100vh - 50px)",
        "&.has-video": {
          marginBottom: "calc(-100vh + 220px)"
        }
      }
    },
    "& ul": {
      margin: "0",
      padding: "5px 0 0 20px",
      marginLeft: "40px",
      height: "271px",
      overflowY: "auto",
      direction: "rtl",
      "@media only screen and (max-width: 1250px)": {
        marginLeft: "20px"
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
        direction: "ltr",
        paddingLeft: "40px",
        "@media only screen and (max-width: 1250px)": {
          paddingLeft: "20px"
        }
      }
    }
  },
  formNavBg: {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right center",
    backgroundImage: `url(${blobImages.red})`,
    "&.brown": {
      backgroundImage: `url(${blobImages.brown})`
    },
    "&.green": {
      backgroundImage: `url(${blobImages.green})`
    },
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      backgroundSize: "cover",
      backgroundPosition: "center bottom",
      backgroundImage: `url(${blobImages.redM})`,
      "&.brown": {
        backgroundImage: `url(${blobImages.brownM})`
      },
      "&.green": {
        backgroundImage: `url(${blobImages.greenM})`
      },
      "&.small-bg": {
        backgroundImage: `url(${blobImages.redS})`,
        "&.brown": {
          backgroundImage: `url(${blobImages.brownS})`
        },
        "&.green": {
          backgroundImage: `url(${blobImages.greenS})`
        }
      }
    }
  },
  contentContainer: {
    width: 340,
    marginLeft: 80,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    "@media only screen and (max-width: 1300px)": {
      marginLeft: 40,
      width: "auto",
      paddingRight: "25px"
    },
    "@media only screen and (max-width: 1220px)": {
      marginLeft: 20
    },
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      margin: 0,
      padding: "0 16px"
    }
  },
  sectionTitle: {
    color: "#fff",
    fontSize: "48px",
    lineHeight: "1.17",
    fontWeight: 600,
    fontFamily: "Open Sans",
    marginBottom: "50px",
    "@media only screen and (max-width: 1300px)": {
      paddingRight: "16px",
      fontSize: "40px"
    },
    "@media only screen and (max-width: 1220px)": {
      fontSize: "32px"
    },
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      margin: "0 0 30px",
      padding: 0,
      maxWidth: "500px"
    },
    "@media only screen and (max-width: 374px)": {
      fontSize: "28px"
    }
  },
  sectionSubtitle: {
    fontSize: "16px",
    lineHeight: "1.5",
    color: "#fff",
    marginBottom: 50,
    display: "block",
    fontWeight: "normal",
    fontFamily: "Open Sans",
    "@media only screen and (max-width: 1220px)": {
      paddingRight: "25px"
    },
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      fontSize: "14px",
      margin: "-20px 0 30px"
    }
  },
  nextButton: {
    width: "238px"
  }
};

const accountInfo = {
  RAKstarter: {
    title: "RAKstarter account",
    subtitle: "A zero balance account, for the budding entrepreneurs out there."
  },
  "Current Account": {
    title: "Business Current Account",
    subtitle: "Our most flexible account for growing businesses."
  },
  RAKelite: {
    title: "RAKelite  business account",
    subtitle: "Our most exclusive account, for our most exclusive clients."
  },
  comeBackLogin: {
    title: "Good to see you back!"
  },
  comeBackVerification: {
    title: "Confirm that it's you"
  }
};

const AccountInfo = ({ classes, accountType, history }) => {
  const { location: { pathname } = {} } = history;
  const handleClick = path => history.push(path);

  const isApplicationOverview = pathname === routes.applicationOverview;
  const isMyApplications = pathname === routes.MyApplications;
  const isComeBackLogin = pathname === routes.comeBackLogin;
  const isComeBackVerification = pathname === routes.comeBackLoginVerification;
  const isReUploadDocuments = pathname === routes.reUploadDocuments;

  return (
    <div className={classes.contentContainer}>
      {accountType && pathname !== routes.applicationOverview ? (
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
          <ContainedButton
            withRightArrow
            justify="flex-start"
            label="Apply now"
            handleClick={() => handleClick(routes.applicationOverview)}
          />
        </>
      ) : (
        <>
          <Typography variant="h2" component="h2" classes={{ root: classes.sectionTitle }}>
            {isApplicationOverview
              ? "Opening an account has never been this simple."
              : isMyApplications
              ? "Your  applications, at a glance"
              : isComeBackLogin
              ? "Good to see you back!"
              : isReUploadDocuments
              ? "Edit your application"
              : isComeBackVerification
              ? "Confirm that it's you"
              : "All businesses start with an account. Get yours now."}
          </Typography>
          {isApplicationOverview && (
            <>
              <div className="hide-on-mobile">
                <ContainedButton
                  withRightArrow
                  justify="flex-start"
                  label="Start application"
                  handleClick={() => handleClick(routes.applicantInfo)}
                />
              </div>
              <div className="show-on-mobile">
                <MobileNotification />
              </div>
            </>
          )}
        </>
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

const getAccountTypeClass = (accountType, islamicBanking) => {
  if (accountType && accountType === accountsNames.elite) {
    return " brown";
  } else if (islamicBanking) {
    return " green";
  } else {
    return "";
  }
};

class FormNavigation extends React.Component {
  state = {
    step: (this.getRouteConfig() || {}).step || 1,
    isSwitcherShow: false
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

  toggleSwitcherShow = () => {
    const { isSwitcherShow } = this.state;
    const value = !isSwitcherShow;
    this.setState({ isSwitcherShow: value });
  };

  render() {
    const {
      applicationInfo: { islamicBanking, accountType },
      location,
      classes,
      history,
      checkLoginStatus
    } = this.props;
    const { step, isSwitcherShow } = this.state;
    const showAccountInfo = new Set([
      routes.accountsComparison,
      routes.detailedAccount,
      routes.applicationOverview,
      routes.MyApplications,
      routes.comeBackLogin,
      routes.comeBackLoginVerification,
      routes.reUploadDocuments
    ]).has(location.pathname);
    const showSmallBg = new Set([
      routes.accountsComparison,
      routes.comeBackLogin,
      routes.comeBackLoginVerification
    ]).has(location.pathname);
    const bgTypeClass = getAccountTypeClass(accountType, islamicBanking);
    const bgSizeClass = showSmallBg ? " small-bg" : "";
    const openClass = isSwitcherShow ? " open" : "";
    const hasVideoClass = routes.accountsComparison === location.pathname ? " has-video" : "";

    return (
      <div
        className={
          `${classes.formNav} ${classes.formNavBg}` +
          bgTypeClass +
          bgSizeClass +
          openClass +
          hasVideoClass
        }
      >
        <IslamicBankingSwitcherMobile
          className={`show-on-mobile ${classes.formNavBg}` + bgTypeClass}
          isSwitcherShow={isSwitcherShow}
          toggleSwitcherShow={this.toggleSwitcherShow}
        >
          <Typography variant="h2" component="h2" classes={{ root: classes.sectionTitle }}>
            What banking option do you prefer?
          </Typography>
        </IslamicBankingSwitcherMobile>
        {showAccountInfo ? (
          <AccountInfo classes={classes} accountType={accountType} history={history} />
        ) : (
          location.pathname !== routes.login && (
            <FormStepper step={step} path={location.pathname} checkLoginStatus={checkLoginStatus} />
          )
        )}
        {!(checkLoginStatus || location.pathname === routes.login) && <Chat />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  applicationInfo: get(state, "appConfig.prospect.applicationInfo", {}),
  checkLoginStatus: loginSelector.checkLoginStatus(state)
});

export default compose(
  connect(mapStateToProps),
  withStyles(style),
  withRouter
)(FormNavigation);
