import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import * as loginSelector from "./../store/selectors/loginSelector";
import * as appConfigSelectors from "../store/selectors/appConfig";
import { accountsNames } from "../constants";
import router from "../routes";

const styles = {
  headerTitle: {
    backgroundColor: "#fff",
    marginBottom: "115px",
    "& span": {
      maxWidth: "780px",
      width: "100%",
      fontSize: "14px",
      color: "#86868b",
      "& span": {
        fontWeight: "600"
      }
    }
  },
  headerTitleIn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  }
};

const HeaderTitle = props => {
  const {
    classes,
    location: { pathname },
    applicationInfo: { islamicBanking, accountType },
    organizationInfo: { companyName }
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

  return (
    <div className={classes.headerTitle}>
      <div className={classes.headerTitleIn}>
        <span>
          {portalTitle.length ? (
            portalTitle
          ) : (
            <>
              {selectedAccountTypeName} {islamicBanking && "islamic"} application{" "}
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

export default compose(
  connect(mapStateToProps),
  withStyles(styles),
  withRouter
)(HeaderTitle);
