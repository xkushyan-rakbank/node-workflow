import React, { useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { checkLoginStatus } from "../../store/selectors/loginSelector";
import { getAgentName } from "../../store/selectors/appConfig";
import { getCompanyName } from "../../store/selectors/appConfig";
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
  companyName,
  isAgent,
  withoutMarginBottom,
  logout,
  agentName
}) => {
  const classes = useStyles({ withoutMarginBottom });
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

  const agentLogout = useCallback(() => {
    logout();
    history.push(routes.login);
  }, [logout, history]);

  return (
    <div className={classes.headerTitle}>
      <div className={classes.headerTitleIn}>
        <span>
          {isAgent && (
            <>
              <div>{agentName}</div>
              <div className={classes.logout} onClick={() => agentLogout()}>
                Logout
              </div>
            </>
          )}
          {![routes.searchProspect].includes(pathname) && (
            <>
              {selectedAccountTypeName} {islamicBanking && "RAKislamic"} Application{" "}
            </>
          )}
          {!applicationOverviewRoutes.includes(pathname) && companyName && (
            <>
              for <span>{companyName}</span>
            </>
          )}
        </span>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  agentName: getAgentName(state),
  isAgent: checkLoginStatus(state),
  islamicBanking: getIsIslamicBanking(state),
  accountType: getAccountType(state),
  companyName: getCompanyName(state)
});

const mapDispatchToProps = {
  logout
};

export const HeaderTitle = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderTitleComponent);
