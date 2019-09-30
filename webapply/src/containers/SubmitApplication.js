import React from "react";
import { withStyles } from "@material-ui/core";
import Checkbox from "../components/InputField/Checkbox";
import Button from "../components/Buttons/SubmitButton";
import FormTitle from "../components/FormTitle";
import brief from "../assets/icons/brief.png";
import * as appConfigSelectors from "../store/selectors/appConfig";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

const style = {
  checkboxesWrapper: {
    "&>label": {
      marginBottom: "20px"
    }
  },
  divider: {
    margin: "26.5px 0 23.5px",
    borderTop: "1px solid rgba(230, 230, 230, 0.5)",
    marginBottom: "24px"
  },
  listItem: {
    display: "block"
  },
  card: {
    minHeight: "236px",
    margin: "auto auto 40px",
    padding: "40px 20px 42px 20px",
    textAlign: "center",
    borderRadius: "8px",
    boxShadow: "0 1px 16px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
    backgroundImage: "linear-gradient(to bottom, #ffffff, rgba(255, 255, 255, 0))"
  },
  icon: {
    width: "37px",
    height: "37px",
    border: "solid 1.5px #e9e9ed",
    borderRadius: "50%",
    margin: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&>svg": {
      fontSize: "20px"
    }
  },
  mainTitle: {
    fontSize: "20px",
    fontWeight: 600,
    lineHeight: 1.4,
    color: "#373737"
  },
  secondaryTitle: {
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: 1.29,
    color: "#263d4c"
  },
  grayText: {
    fontSize: "14px",
    lineHeight: 1.29,
    color: "#86868b"
  },
  indent: {
    marginBottom: "15px"
  }
};

class SubmitApplication extends React.Component {
  state = {
    isInformationProvided: false,
    areTermsAgreed: false,
    needCommunication: false
  };

  handleChange = ({ currentTarget }) => {
    const name = currentTarget.name;
    this.setState({ [name]: !this.state[name] });
  };

  handleClick = () => {
    const { history } = this.props;
    history.push("/ApplicationSubmitted");
  };

  render() {
    const { classes, applicationInfo, accountInfo, signatoryInfo, organizationInfo } = this.props;
    const [account] = accountInfo;
    const companyName = organizationInfo.companyName || "Company name";
    const accountType = applicationInfo.accountType || "Account type";
    const currencies = accountInfo.length && account.accountCurrencies.join(" & ");
    const stakeholders = signatoryInfo.map(stakeholder => (
      <div key={stakeholder.fullName} className={classes.grayText}>
        {stakeholder.fullName}
      </div>
    ));
    const isDebitCardApplied = accountInfo.length && account.debitCardApplied;
    const isChequeBookApplied = accountInfo.length && account.chequeBookApplied;
    const isOnlineBankingApplied = accountInfo.length && account.eStatements;
    const rakValuePackage = applicationInfo.rakValuePackage || "RAKvalue package";
    const { isInformationProvided, areTermsAgreed, needCommunication } = this.state;
    return (
      <>
        <FormTitle
          title="Submit application"
          info="And just like that, we have reached the end! Here’s the overview of what you’re applying for."
        />
        <div className={classes.card}>
          <div className={classes.icon}>
            <img src={brief} alt="brief" width={24} height={24} />
          </div>
          <div className={classes.mainTitle}>{companyName}</div>
          <div className={classes.grayText}>{accountType}</div>
          <div className={classes.divider} />
          {signatoryInfo.length > 0 && (
            <div className={classes.indent}>
              <div className={classes.secondaryTitle}>Company Stakeholders</div>
              {stakeholders}
            </div>
          )}
          <div className={classes.secondaryTitle}>Services selected</div>
          <div className={classes.grayText}>{currencies}</div>
          {/* TODO not implemented yet */}
          <div className={classes.grayText}>Any of you can sign</div>
          {isDebitCardApplied && (
            <div className={classes.grayText}>Debit cards for all signatories</div>
          )}
          {isChequeBookApplied && (
            <div className={classes.grayText}>Cheque book for the company</div>
          )}
          {isOnlineBankingApplied && <div className={classes.grayText}>Online bank statements</div>}
          <div className={classes.grayText}>{rakValuePackage}</div>
        </div>
        <div className={classes.checkboxesWrapper}>
          <Checkbox
            value={isInformationProvided}
            name="isInformationProvided"
            label="I confirm that the information provided is true and complete"
            className={classes.listItem}
            onChange={this.handleChange}
          />
          <Checkbox
            value={areTermsAgreed}
            name="areTermsAgreed"
            label={
              <span>
                I agree with RakBank’s <a href="/">terms and conditions</a>
              </span>
            }
            className={classes.listItem}
            onChange={this.handleChange}
          />
          <Checkbox
            value={needCommunication}
            name="needCommunication"
            label="I want to receive marketing and promotional communication from RakBank"
            className={classes.listItem}
            onChange={this.handleChange}
          />
        </div>
        <Button
          disabled={!(isInformationProvided && areTermsAgreed)}
          label="Submit"
          handleClick={this.handleClick}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  applicationInfo: appConfigSelectors.getApplicationInfo(state),
  accountInfo: appConfigSelectors.getAccountInfo(state),
  signatoryInfo: appConfigSelectors.getSignatories(state),
  organizationInfo: appConfigSelectors.getOrganizationInfo(state)
});

export default compose(
  connect(mapStateToProps),
  withStyles(style),
  withRouter
)(SubmitApplication);
