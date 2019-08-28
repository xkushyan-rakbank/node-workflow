import React, { Component } from "react";
import SectionTitle from "../SectionTitle";
import Checkbox from "../InputField/Checkbox";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import ContinueButton from "../Buttons/ContinueButton";
import TextInput from "../InputField/TextInput";

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
    marginTop: "30px",
    borderBottom: "solid 1px rgba(230, 230, 230, 0.5)"
  },
  controlsWrapper: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0 0"
  }
};

class AnticipatedTransactions extends Component {
  static defaultProps = {
    handleContinue: () => {},
    companyCurrency: "AED"
  };

  constructor(props) {
    super(props);

    this.commonInputProps = {
      endAdornment: (
        <InputAdornment position="end">
          {this.props.companyCurrency}
        </InputAdornment>
      )
    };
  }

  render() {
    return (
      <form>
        <SectionTitle
          title="Anticipated transactions"
          className={this.props.classes.title}
        />

        <h4 className={this.props.classes.groupLabel}>
          Source of funds from the business
        </h4>
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
          Details of anticipated transactions
        </h4>
        <Grid
          container
          spacing={3}
          className={this.props.classes.flexContainer}
        >
          <Grid item sm={12}>
            {/* not correct should be calculated with local state??? */}
            {/*<TextInput id="???" InputProps={this.commonInputProps} />*/}
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

export default withStyles(style)(AnticipatedTransactions);
