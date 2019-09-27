import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import routes from "./../routes";
import logo from "./../assets/images/rakbankLogo.png";
import { withStyles } from "@material-ui/core/styles";
import * as loginSelector from "./../store/selectors/loginSelector";

const styles = {
  header: {
    position: " fixed",
    top: " 0",
    width: " 100%",
    display: "flex",
    zIndex: 12,
    "& img": {
      width: "120px"
    }
  },
  logo: {
    flex: "0 0 calc(530px - 40px)",
    padding: "28px 0 28px 40px",
    "@media only screen and (max-width: 1300px)": {
      flex: "0 0 calc(45% - 40px)"
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
      color: "#86868b"
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

const Header = ({ classes, checkLoginStatus, getAgentName, location }) => {
  return (
    <header className={classes.header}>
      <Link to={routes.accountsComparison} className={classes.logo}>
        <img src={logo} alt="rak bank" />
      </Link>
      <div className={classes.headerTitle}>
        <div className={classes.headerTitleIn}>
          {checkLoginStatus ? (
            <span>{getAgentName}</span>
          ) : (
            location.pathname != "/Login" && <span> RAKstarter Application </span>
          )}
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = state => ({
  checkLoginStatus: loginSelector.checkLoginStatus(state),
  getAgentName: loginSelector.getAgentName(state)
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles),
  withRouter
)(Header);
