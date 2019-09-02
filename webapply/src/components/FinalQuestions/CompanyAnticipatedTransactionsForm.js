import React, { Component } from "react";
import { connect } from "react-redux";
import SectionTitle from "../SectionTitle";
import Checkbox from "../InputField/Checkbox";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import ContinueButton from "../Buttons/ContinueButton";
import TextInput from "../InputField/TextInput";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InfoTitle from "../InfoTitle";
import { getInputValueById } from "../../store/selectors/appConfig";

const style = {
  title: {
    fontSize: "16px"
  },
  groupLabel: {
    marginTop: "15px",
    marginBottom: "7px",
    fontSize: "16px",
    fontWeight: "600",
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
    justifyContent: "center",
    margin: "20px 0 0"
  },
  disabledInput: {
    backgroundColor: "rgba(242, 242, 242, 0.5)"
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
      endAdornment: (
        <InputAdornment position="end">
          {this.props.companyCurrency}
        </InputAdornment>
      )
    };
  }

  getTotalMonthlyCreditsValue() {
    const { annualFinancialTurnover } = this.props;
    if (
      !annualFinancialTurnover ||
      Number.isNaN(Number(annualFinancialTurnover))
    ) {
      return "Total Monthly Credits";
    }
    return `${(annualFinancialTurnover / 12).toFixed(
      0
    )} in Total Monthly Credits`;
  }

  render() {
    return (
      <form>
        <SectionTitle
          title="Anticipated transactions"
          className={this.props.classes.title}
        />

        <Grid
          container
          spacing={3}
          className={this.props.classes.flexContainer}
        >
          <Grid item sm={12}>
            <TextInput id="UI0184" InputProps={this.commonInputProps} />
          </Grid>
        </Grid>

        <div className={this.props.classes.divider} />

        <h4 className={this.props.classes.groupLabel}>
          Anticipated monthly transactions
        </h4>
        <Grid
          container
          spacing={3}
          className={this.props.classes.flexContainer}
        >
          <Grid item sm={12}>
            <FormControl className="formControl">
              <TextField
                className={this.props.classes.disabledInput}
                variant="outlined"
                disabled
                InputProps={this.commonInputProps}
                value={this.getTotalMonthlyCreditsValue()}
              />
              <InfoTitle title="This section is calculated based on the company’s Annual Financial Turnover" />
            </FormControl>
          </Grid>
          <Grid item md={6} sm={12}>
            <TextInput id="UI0209" InputProps={this.commonInputProps} />
          </Grid>
          <Grid item md={6} sm={12}>
            <TextInput id="UI0212" InputProps={this.commonInputProps} />
          </Grid>
        </Grid>
        <div className={this.props.classes.divider} />

        <h4 className={this.props.classes.groupLabel}>
          Maximum amount expected in a single transaction
        </h4>

        <Grid
          container
          spacing={3}
          className={this.props.classes.flexContainer}
        >
          <Grid item md={6} sm={12}>
            <TextInput id="UI0215" InputProps={this.commonInputProps} />
          </Grid>
          <Grid item md={6} sm={12}>
            <TextInput id="UI0216" InputProps={this.commonInputProps} />
          </Grid>
        </Grid>
        <Checkbox label="The company uses virtual currencies" />

        <div className={this.props.classes.controlsWrapper}>
          <ContinueButton handleClick={this.props.handleContinue} />
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  annualFinancialTurnover: getInputValueById(state, "UI0184")
});

export default withStyles(style)(
  connect(mapStateToProps)(CompanyAnticipatedTransactionsForm)
);
