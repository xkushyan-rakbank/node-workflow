import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link, withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import routes from "./../routes";
import { accountsNames, mobileResolution } from "../constants";
import logo from "../assets/images/rakbankLogo.svg";
import { getAccountType, getIsIslamicBanking } from "../store/selectors/appConfig";

const styles = {
  header: {
    position: "fixed",
    top: "30px",
    left: "40px",
    display: "flex",
    zIndex: 12,
    "@media only screen and (max-width: 1300px)": {
      maxWidth: "270px"
    },
    "& img": {
      minWidth: "140px",
      width: "140px"
    },
    "& a": {
      display: "flex"
    },
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      position: "absolute",
      margin: 0,
      padding: 0,
      top: "20px",
      left: "16px",
      "& img": {
        minWidth: "114px",
        width: "114px"
      }
    }
  },
  accountType: {
    position: "relative",
    fontFamily: "Open Sans",
    fontSize: "12px",
    marginLeft: "10px",
    paddingLeft: "10px",
    paddingTop: "4px",
    color: "#fff",
    fontWeight: "600",
    "&::before": {
      content: "''",
      display: "block",
      width: "2px",
      height: "20px",
      backgroundColor: "#fff",
      position: "absolute",
      left: "0",
      top: "3px"
    }
  }
};

const Header = props => {
  const {
    classes,
    islamicBanking,
    accountType,
    location: { pathname }
  } = props;
  let accountTypeText = "";
  if (accountType === accountsNames.elite) accountTypeText = "RAKelite";
  if (islamicBanking) accountTypeText = "RAKislamic";
  if (accountType === accountsNames.elite && islamicBanking)
    accountTypeText = "RAKelite - RAKislamic";

  const isShowAccountType = routes.accountsComparison !== pathname && accountTypeText.length;

  return (
    <header className={classes.header}>
      <Link to={routes.accountsComparison}>
        <div>
          <img src={logo} alt="rak bank" />
        </div>
        {isShowAccountType ? <span className={classes.accountType}>{accountTypeText}</span> : null}
      </Link>
    </header>
  );
};

const mapStateToProps = state => ({
  islamicBanking: getIsIslamicBanking(state),
  accountType: getAccountType(state)
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles),
  withRouter
)(Header);
