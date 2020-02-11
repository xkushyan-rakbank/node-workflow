import React, { useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";
import cx from "classnames";
import { connect } from "react-redux";

import { getAgentName, checkLoginStatus } from "../../store/selectors/loginSelector";
import { getOrganizationInfo } from "../../store/selectors/appConfig";
import { logout, formatLogin } from "../../store/actions/loginForm";
import { formatSearchList } from "../../store/actions/searchProspect";
import { getAccountType } from "../../store/selectors/appConfig";
import { getIsIslamicBanking } from "../../store/selectors/appConfig";

import { accountNames } from "../../constants";
import routes from "../../routes";
import { useStyles } from "./styled";

const HeaderTitleComponent = ({
  islamicBanking,
  accountType,
  organizationInfo: { companyName },
  checkLoginStatus,
  getAgentName,
  withMargin,
  withoutMarginBottom,
  ...props
}) => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const history = useHistory();

  let selectedAccountTypeName = "";
  switch (accountType) {
    case accountNames.elite:
      selectedAccountTypeName = accountNames.elite;
      break;
    case accountNames.currentAccount:
      selectedAccountTypeName = accountNames.currentAccount;
      break;
    case accountNames.starter:
    default:
      selectedAccountTypeName = accountNames.starter;
      break;
  }

  const isHideCompanyName = pathname === routes.applicationOverview;

  const routesToShowPortalTitle = [
    routes.login,
    routes.comeBackLoginVerification,
    routes.MyApplications
  ];

  const agentLogout = useCallback(() => {
    props.logout();
    props.formatLogin();
    props.formatSearchList();
    history.push(routes.login);
  }, []);

  return (
    <div
      className={cx(
        classes.headerTitle,
        withoutMarginBottom && classes.withoutMarginBottom,
        withMargin && classes.withMargin
      )}
    >
      <div className={classes.headerTitleIn}>
        <span>
          {routesToShowPortalTitle.includes(pathname) ? (
            "RAK Application Portal"
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
              {!isHideCompanyName && companyName ? (
                <>
                  for <span>{companyName}</span>
                </>
              ) : null}
            </>
          )}
        </span>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  checkLoginStatus: checkLoginStatus(state),
  getAgentName: getAgentName(state),
  islamicBanking: getIsIslamicBanking(state),
  accountType: getAccountType(state),
  organizationInfo: getOrganizationInfo(state)
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
