import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextInput from "../InputField/TextInput";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InfoTitle from "../InfoTitle";
import isNumber from "lodash/isNumber";
import isNaN from "lodash/isNaN";
import { getInputValueById } from "../../store/selectors/input";
import cx from "classnames";

const styles = {
  title: {
    fontSize: "16px"
  },
  groupLabel: {
    marginTop: "15px",
    marginBottom: "7px",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "1.9",
    color: "#373737"
  },
  flexContainer: {
    marginTop: "0",
    marginBottom: "0"
  },
  divider: {
    marginTop: "0px",
    borderBottom: "solid 1px rgba(230, 230, 230, 0.5)"
  },
  controlsWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "20px 0 0"
  },
  disabledInput: {
    backgroundColor: "rgba(242, 242, 242, 0.5)"
  },
  infoTitles: {
    color: "#86868b"
  },
  nonCashTitle: {
    position: "relative",
    top: "-10px",
    marginBottom: "10px"
  }
};

class CompanyAnticipatedTransactionsForm extends Component {
  static defaultProps = {
    handleContinue: () => {},
    companyCurrency: "AED"
  };

  constructor(props) {
    super(props);

    this.state = {
      totalMonthlyCreditsValue: 0
    };

    this.commonInputProps = {
      endAdornment: <InputAdornment position="end">{this.props.companyCurrency}</InputAdornment>
    };
  }

  componentDidMount() {
    const isButtonDisabled = this.isContinueDisabled();
    this.props.setIsContinueDisabled(isButtonDisabled);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const isButtonDisabled = this.isContinueDisabled();
    this.props.setIsContinueDisabled(isButtonDisabled);
  }

  getNumberOrZero(value) {
    value = Number(value);
    return !isNaN(value) && isNumber(value) ? value : 0;
  }

  getMonthFinancialTurnover() {
    const total = this.getNumberOrZero(this.props.annualFinancialTurnover);
    return total ? total / 12 : 0;
  }

  getTotalMonthlyCreditsValue() {
    const monthFinancialTurnover = this.getMonthFinancialTurnover();
    if (!monthFinancialTurnover) {
      return "Total Monthly Credits";
    }
    return `${monthFinancialTurnover.toFixed(0)} in Total Monthly Credits`;
  }

  partOfTotalInCashMaxValue() {
    if (this.getMonthFinancialTurnover() > 0) {
      return (
        this.getMonthFinancialTurnover() - this.getNumberOrZero(this.props.notCashAmountInFigures)
      );
    }
  }

  partOfTotalInNotCashMaxValue() {
    if (this.getMonthFinancialTurnover() > 0) {
      return (
        this.getMonthFinancialTurnover() - this.getNumberOrZero(this.props.cashAmountInFigures)
      );
    }
  }

  maximumSingleAmountInCashMaxValue() {
    const allAmount = this.getNumberOrZero(this.props.annualFinancialTurnover);
    if (allAmount > 0) {
      return allAmount - this.getNumberOrZero(this.props.maximumSingleNotCashAmount);
    }
  }

  maximumSingleAmountInNotCashMaxValue() {
    const allAmount = this.getNumberOrZero(this.props.annualFinancialTurnover);
    if (allAmount > 0) {
      return allAmount - this.getNumberOrZero(this.props.maximumSingleCashAmount);
    }
  }

  isContinueDisabled = () => {
    return !this.props.maximumSingleNotCashAmount;
  };

  render() {
    return (
      <>
        <Grid container spacing={3} className={this.props.classes.flexContainer}>
          <Grid item sm={12}>
            <TextInput
              min="0"
              id="Okyc.annualFinTurnoverAmtInAED"
              InputProps={this.commonInputProps}
            />
          </Grid>
        </Grid>

        <div className={this.props.classes.divider} />

        <h4 className={this.props.classes.groupLabel}>Monthly transactions</h4>
        <Grid container spacing={3} className={this.props.classes.flexContainer}>
          <Grid item sm={12}>
            <FormControl className="formControl">
              <TextField
                className={this.props.classes.disabledInput}
                variant="outlined"
                disabled
                InputProps={this.commonInputProps}
                value={this.getTotalMonthlyCreditsValue()}
              />
              <InfoTitle
                classes={{ wrapper: this.props.classes.infoTitles }}
                title="This section is calculated based on the company’s Annual Financial Turnover"
              />
            </FormControl>
          </Grid>
          <Grid item md={6} sm={12}>
            <TextInput
              min="0"
              max={this.partOfTotalInCashMaxValue()}
              id="OkycAntTxnTotCashCr.amountInFigures"
              InputProps={this.commonInputProps}
            />
          </Grid>
          <Grid item md={6} sm={12}>
            <TextInput
              min="0"
              max={this.partOfTotalInNotCashMaxValue()}
              id="OkycAntTxnTotNonCashCr.amountInFigures"
              InputProps={this.commonInputProps}
            />
            <InfoTitle
              classes={{
                wrapper: cx(this.props.classes.infoTitles, this.props.classes.nonCashTitle)
              }}
              title="Non-cash: cheque / EFT / internal transfer / point of sale"
            />
          </Grid>
        </Grid>
        <div className={this.props.classes.divider} />

        <h4 className={this.props.classes.groupLabel}>
          Maximum amount expected in a single transaction
        </h4>

        <Grid container spacing={3} className={this.props.classes.flexContainer}>
          <Grid item md={6} sm={12}>
            <TextInput
              min="0"
              max={this.maximumSingleAmountInCashMaxValue()}
              id="OkycAntTxn.maxAmtSingleTxnCashAED"
              InputProps={this.commonInputProps}
            />
          </Grid>
          <Grid item md={6} sm={12}>
            <TextInput
              min="0"
              max={this.maximumSingleAmountInNotCashMaxValue()}
              id="OkycAntTxn.maxAmtSingleTxnNonCashAED"
              InputProps={this.commonInputProps}
            />
            <InfoTitle
              classes={{
                wrapper: cx(this.props.classes.infoTitles, this.props.classes.nonCashTitle)
              }}
              title="Non-cash: cheque / EFT / internal transfer / point of sale"
            />
          </Grid>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = state => ({
  annualFinancialTurnover: getInputValueById(state, "Okyc.annualFinTurnoverAmtInAED"),
  cashAmountInFigures: getInputValueById(state, "OkycAntTxnTotCashCr.amountInFigures"),
  notCashAmountInFigures: getInputValueById(state, "OkycAntTxnTotNonCashCr.amountInFigures"),
  maximumSingleCashAmount: getInputValueById(state, "OkycAntTxn.maxAmtSingleTxnCashAED"),
  maximumSingleNotCashAmount: getInputValueById(state, "OkycAntTxn.maxAmtSingleTxnNonCashAED")
});

export default withStyles(styles)(connect(mapStateToProps)(CompanyAnticipatedTransactionsForm));
