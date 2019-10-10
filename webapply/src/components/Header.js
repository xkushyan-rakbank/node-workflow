import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import routes from "./../routes";
import { getIconsByAccount } from "../constants/icons";
import { withStyles } from "@material-ui/core/styles";
import * as loginSelector from "./../store/selectors/loginSelector";
import * as appConfigSelectors from "../store/selectors/appConfig";

import {
  sideNavWidthXL,
  sideNavWidthMD,
  sideNavWidthSM,
  routesToHideHeaderTitle
} from "../constants/styles";

const styles = {
  header: {
    position: " fixed",
    top: " 0",
    width: " 100%",
    display: "flex",
    zIndex: 12
  },
  logoContainer: {
    boxSizing: "border-box",
    width: `${sideNavWidthXL}px`,
    padding: "28px 0 28px 40px",
    "@media only screen and (max-width: 1300px)": {
      width: `${sideNavWidthMD}px`
    },
    "@media only screen and (max-width: 1220px)": {
      width: `${sideNavWidthSM}px`,
      paddingLeft: "20px"
    }
  },
  headerTitle: {
    display: "flex",
    flex: "1 1 auto",
    backgroundColor: "#fff",
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
    padding: "0 50px",
    width: "100%"
  }
};

const Header = props => {
  const {
    classes,
    checkLoginStatus,
    getAgentName,
    location,
    applicationInfo,
    organizationInfo
  } = props;
  const { logo } = getIconsByAccount();

  return (
    <header className={classes.header}>
      <div className={classes.logoContainer}>
        <Link to={routes.accountsComparison}>
          <img src={logo} alt="rak bank" />
        </Link>
      </div>

      {!routesToHideHeaderTitle.includes(location.pathname) && (
        <div className={classes.headerTitle}>
          <div className={classes.headerTitleIn}>
            {checkLoginStatus ? (
              <span>{getAgentName}</span>
            ) : (
              location.pathname !== "/Login" && (
                <span>
                  {applicationInfo.rakValuePackage}
                  <span> {organizationInfo.companyName}</span>
                </span>
              )
            )}
          </div>
        </div>
      )}
    </header>
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
)(Header);
