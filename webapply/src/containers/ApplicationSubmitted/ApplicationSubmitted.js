import React from "react";
import cx from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { getIconsByAccount } from "../../constants/icons";
import { connect } from "react-redux";
import dotsBg from "../../assets/images/dots_bg.png";
import SectionTitleWithInfo from "../../components/SectionTitleWithInfo";
import { InfoNote } from "../../components/InfoNote";
import * as accountInfoSelector from "../../store/selectors/appConfig";

const styles = {
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    "& img": {
      width: "115px",
      marginBottom: "50px",
      "@media only screen and (max-width: 1300px)": {
        width: "85px",
        marginBottom: "20px"
      }
    }
  },
  accountsNumbers: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "space-between",
    "@media only screen and (max-width: 1420px)": {
      flexGrow: 1
    },
    "@media only screen and (max-width: 1300px)": {
      flexDirection: "column",
      alignItems: "center",
      marginTop: "10px",
      "& div + div": {
        marginTop: "20px"
      }
    }
  },
  accountsNumbersColumn: {
    flexDirection: "column",
    alignItems: "center",
    "& div + div": {
      marginTop: "20px",
      "@media only screen and (max-width: 991px)": {
        marginTop: "10px"
      }
    }
  },
  accountsNumbersRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    "& div + div": {
      "@media only screen and (max-width: 991px)": {
        marginTop: "10px"
      }
    }
  },
  accountNumber: {
    marginBottom: "6px",
    padding: "30px",
    width: "380px",
    borderRadius: "8px",
    boxShadow: "5px 5px 25px 0 rgba(0, 0, 0, 0.07)",
    boxSizing: "border-box",
    position: "relative",
    overflow: "hidden",
    "@media only screen and (max-width: 1420px)": {
      width: "calc(50% - 10px)"
    },
    "@media only screen and (max-width: 1300px)": {
      width: "320px",
      padding: "20px 30px"
    },
    "@media only screen and (max-width: 991px)": {
      width: "100%",
      padding: "15px 30px"
    },
    "& .info": {
      fontSize: "14px",
      color: "#373737"
    },
    "& .mainInfo": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end"
    },
    "& .number": {
      fontSize: "24px",
      color: "#373737"
    },
    "& .typeAccount": {
      fontSize: "12px",
      color: "#86868b"
    }
  },
  dottedBg: {
    position: "absolute",
    width: "100%",
    top: -10,
    left: 2,
    height: "auto",
    zIndex: "-1"
  },
  accountNumberColumn: {
    "@media only screen and (max-width: 991px)": {
      padding: "5px 30px",
      "& .number": {
        fontSize: "20px"
      }
    }
  },
  accountNumberRow: {
    "@media only screen and (max-width: 991px)": {
      padding: "5px 30px",
      "& .number": {
        fontSize: "20px"
      }
    }
  },
  infoBottom: {
    maxWidth: "443px",
    margin: "0 auto"
  },
  divider: {
    height: "1px",
    backgroundColor: "rgba(230, 230, 230, 0.5)",
    margin: "60px 0",
    "@media only screen and (max-width: 1300px)": {
      margin: "20px 0"
    }
  },
  result: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& img": {
      width: "44px"
    }
  },
  resultNextStep: {
    fontSize: "20px",
    color: "#373737",
    fontWeight: "600",
    marginTop: "15px"
  },
  resultNextStepInfo: {
    fontSize: "20px",
    color: "#373737"
  }
};

class ApplicationSubmitted extends React.Component {
  render() {
    const { classes, AccountSubmittedInfo } = this.props;
    const { companyDocuments, banking } = getIconsByAccount();

    return AccountSubmittedInfo && AccountSubmittedInfo.length > 0 ? (
      <div className={classes.container}>
        <div className={classes.title}>
          <img src={companyDocuments} alt="checked" />
          <SectionTitleWithInfo title="Meet the brand new accounts for Designit Arabia" />
        </div>
        <div
          className={cx(classes.accountsNumbers, {
            [classes.accountsNumbersRow]: AccountSubmittedInfo.length % 2 === 0,
            [classes.accountsNumbersColumn]: AccountSubmittedInfo.length % 2 !== 0
          })}
        >
          {AccountSubmittedInfo.map(accountData => (
            <div
              className={cx(classes.accountNumber, {
                [classes.accountNumberRow]: AccountSubmittedInfo.length
              })}
              key={accountData.id}
            >
              <img src={dotsBg} className={classes.dottedBg} alt="background" />

              <span className="info">Your AED account number</span>
              <div className="mainInfo">
                <span className="number">{accountData.accountNo}</span>
                <span className="typeAccount">{accountData.accountCurrencies}</span>
              </div>
            </div>
          ))}
        </div>
        <div className={classes.infoBottom}>
          <InfoNote
            text="Account numbers are provisional and subject to internal approvals. You will be able to make transactions on the accounts once they get activated."
            style={{ marginTop: "20px", position: "static" }}
          />
        </div>
        <div className={classes.divider}>{""}</div>
        <div className={classes.result}>
          <img src={banking} alt="wait call" />
          <Typography align="center" classes={{ root: classes.resultNextStep }}>
            What happens now
          </Typography>
          <Typography align="center" classes={{ root: classes.resultNextStepInfo }}>
            We will call you back very soon to sign your application. Hold tight.
          </Typography>
        </div>
      </div>
    ) : (
      <div></div>
    );
  }
}

const mapStateToProps = state => {
  return {
    AccountSubmittedInfo: accountInfoSelector.getAccountSubmittedInfo(state)
  };
};

export default withStyles(styles)(connect(mapStateToProps)(ApplicationSubmitted));
