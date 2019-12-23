import React from "react";
import { withRouter } from "react-router-dom";
import cx from "classnames";
import { compose } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import * as loginSelector from "./../store/selectors/loginSelector";
import * as appConfigSelectors from "../store/selectors/appConfig";
import { accountsNames, mobileResolution } from "../constants";
import router from "../routes";
import { logout, formatLogin } from "./../store/actions/loginForm";
import { formatSearchList } from "./../store/actions/searchProspect";
import routes from "../routes";

const styles = {
  headerTitle: {
    backgroundColor: "#fff",
    marginBottom: "115px",
    "& span": {
      width: "100%",
      fontSize: "14px",
      color: "#86868b",
      "& span": {
        fontWeight: "600"
      }
    },
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      display: "none"
    }
  },
  withMargin: {
    marginTop: "-130px"
  },
  headerTitleIn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  logout: {
    float: "right",
    marginTop: "-20px",
    cursor: "pointer"
  }
};

const HeaderTitle = props => {
  const {
    classes,
    location: { pathname },
    applicationInfo: { islamicBanking, accountType },
    organizationInfo: { companyName },
    checkLoginStatus,
    getAgentName,
    withMargin
  } = props;

  let selectedAccountTypeName = "";
  switch (accountType) {
    case accountsNames.elite:
      selectedAccountTypeName = "RAKelite";
      break;
    case accountsNames.starter:
      selectedAccountTypeName = "RAKstarter";
      break;
    case accountsNames.currentAccount:
      selectedAccountTypeName = "Current Account";
      break;
    default:
      selectedAccountTypeName = "RAKstarter";
  }

  const organizationName = companyName ? (
    <>
      for <span>{companyName}</span>
    </>
  ) : null;
  const isHideCompanyName = pathname === router.applicationOverview;

  let portalTitle = "";
  const routesToShowPortalTitle = new Set([
    router.login,
    router.comeBackLoginVerification,
    router.MyApplications
  ]);
  if (routesToShowPortalTitle.has(pathname)) portalTitle = "RAK Application Portal";

  const agentLogout = () => {
    props.logout();
    props.formatLogin();
    props.formatSearchList();
    props.history.push(routes.login);
  };

  return (
    <div className={cx(classes.headerTitle, withMargin && classes.withMargin)}>
      <div className={classes.headerTitleIn}>
        <span>
          {portalTitle.length ? (
            portalTitle
          ) : checkLoginStatus ? (
            <>
              <div>{getAgentName}</div>
              <div className={classes.logout} onClick={() => agentLogout()}>
                Logout
              </div>
            </>
          ) : (
            <>
              {selectedAccountTypeName} {islamicBanking && "Islamic"} application{" "}
              {!isHideCompanyName && organizationName}
            </>
          )}
        </span>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  checkLoginStatus: loginSelector.checkLoginStatus(state),
  getAgentName: loginSelector.getAgentName(state),
  applicationInfo: appConfigSelectors.getApplicationInfo(state),
  organizationInfo: appConfigSelectors.getOrganizationInfo(state)
});

const mapDispatchToProps = {
  logout,
  formatLogin,
  formatSearchList
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles),
  withRouter
)(HeaderTitle);
