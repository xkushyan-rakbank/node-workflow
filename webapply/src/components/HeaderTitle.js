import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import * as loginSelector from "./../store/selectors/loginSelector";
import * as appConfigSelectors from "../store/selectors/appConfig";

const styles = {
  headerTitle: {
    display: "flex",
    flex: "1 1 auto",
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
    location,
    checkLoginStatus,
    getAgentName,
    applicationInfo,
    organizationInfo
  } = props;
  return (
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
