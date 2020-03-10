import React, { useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";
import cx from "classnames";
import { connect } from "react-redux";

import { checkLoginStatus } from "../../store/selectors/loginSelector";
import { getAgentName } from "../../store/selectors/appConfig";
import { getOrganizationInfo } from "../../store/selectors/appConfig";
import { logout } from "../../store/actions/loginForm";
import { getAccountType } from "../../store/selectors/appConfig";
import { getIsIslamicBanking } from "../../store/selectors/appConfig";

import { accountNames, applicationOverviewRoutes } from "../../constants";
import routes from "../../routes";
import { useStyles } from "./styled";
import { accountTypes } from "../../containers/AccountsComparison/components/TableCompare/constants";

const HeaderTitleComponent = ({
  islamicBanking,
  accountType,
  organizationInfo: { companyName },
  checkLoginStatus,
  getAgentName,
  withMargin,
  withoutMarginBottom,
  logout
}) => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const history = useHistory();

  let selectedAccountTypeName = "";
  switch (accountType) {
    case accountNames.elite:
      selectedAccountTypeName = accountTypes.elite.name;
      break;
    case accountNames.currentAccount:
      selectedAccountTypeName = accountTypes.currentAccount.name;
      break;
    case accountNames.starter:
    default:
      selectedAccountTypeName = accountTypes.starter.name;
      break;
  }

  const isHideCompanyName = applicationOverviewRoutes.includes(pathname);

  const routesToShowPortalTitle = [
    routes.login,
    routes.comeBackLoginVerification,
    routes.MyApplications
  ];

  const agentLogout = useCallback(() => {
    logout();
    history.push(routes.login);
  }, [logout, history]);

  const selectedAccountTypeInfo = () => (
    <>
      {selectedAccountTypeName} {islamicBanking && "RAKislamic"} Application{" "}
      {!isHideCompanyName && companyName && (
        <>
          for <span>{companyName}</span>
        </>
      )}
    </>
  );

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
              {!isHideCompanyName && companyName && selectedAccountTypeInfo()}
            </>
          ) : (
            selectedAccountTypeInfo()
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
  logout
};

export const HeaderTitle = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderTitleComponent);
