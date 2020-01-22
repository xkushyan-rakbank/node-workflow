import React from "react";
import { useLocation } from "react-router-dom";
import cx from "classnames";
import { connect } from "react-redux";
import { accountsNames } from "../../constants";
import * as loginSelector from "../../store/selectors/loginSelector";
import * as appConfigSelectors from "../../store/selectors/appConfig";
import { logout, formatLogin } from "../../store/actions/loginForm";
import { formatSearchList } from "../../store/actions/searchProspect";
import { getAccountType } from "../../store/selectors/appConfig";
import { getIsIslamicBanking } from "../../store/selectors/appConfig";

import routes from "../../routes";
import { useStyles } from "./styled";

const HeaderTitleComponent = ({
  islamicBanking,
  accountType,
  organizationInfo: { companyName },
  checkLoginStatus,
  getAgentName,
  withMargin,
  ...props
}) => {
  const classes = useStyles();
  const { pathname } = useLocation();

  let selectedAccountTypeName = "";
  switch (accountType) {
    case accountsNames.elite:
      selectedAccountTypeName = "RAKelite";
      break;
    case accountsNames.currentAccount:
      selectedAccountTypeName = "Current Account";
      break;
    case accountsNames.starter:
    default:
      selectedAccountTypeName = "RAKstarter";
      break;
  }

  const organizationName = companyName ? (
    <>
      for <span>{companyName}</span>
    </>
  ) : null;
  const isHideCompanyName = pathname === routes.applicationOverview;

  let portalTitle = "";
  const routesToShowPortalTitle = new Set([
    routes.login,
    routes.comeBackLoginVerification,
    routes.MyApplications
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
  islamicBanking: getIsIslamicBanking(state),
  accountType: getAccountType(state),
  organizationInfo: appConfigSelectors.getOrganizationInfo(state)
});

const mapDispatchToProps = {
  logout,
  formatLogin,
  formatSearchList
};

export const HeaderTitle = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderTitleComponent);
