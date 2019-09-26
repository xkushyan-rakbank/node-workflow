import React from "react";
import cx from "classnames";
import get from "lodash/get";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Select from "../InputField/PureSelect";
import Checkbox from "../InputField/Checkbox";
import RadioGroup from "../InputField/RadioGroup";
import FormWrapper from "../StakeholderStepForms/FormWrapper";

const style = {
  formWrapper: {
    margin: 0
  },
  checkboxesWrapper: {
    marginBottom: "30px"
  },
  checkboxWrapper: {
    marginTop: "10px"
  },
  sectionLabel: {
    padding: "30px 0 20px"
  },
  topDivider: {
    borderTop: "1px solid rgba(230, 230, 230, 0.5)",
    marginTop: "30px"
  }
};

class AccountDetails extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <FormWrapper
        className={classes.formWrapper}
        handleContinue={this.props.goToNext}
      >
        <div className={cx("text", classes.sectionLabel)}>Top customers</div>
        <RadioGroup id="Acnt.accountCurrencies" indexes={[0]} />

        <div className={cx("text", classes.topDivider, classes.sectionLabel)}>
          Select branch
        </div>
        <Grid container spacing={3}>
          <Grid item md={6} sm={12}>
            <Select id="Org.branchCity" />
          </Grid>
          <Grid item md={6} sm={12}>
            <Select id="Org.branchID" />
          </Grid>
        </Grid>

        <div className={cx("text", classes.topDivider, classes.sectionLabel)}>
          Select interest
        </div>
        <Checkbox label="I don't wish to receive interest from my account" />
      </FormWrapper>
    );
  }
}

const mapStateToProps = state => ({
  accountCurrencies: get(
    state.appConfig,
    "uiConfig['Acnt.accountCurrencies']",
    { datalist: [] }
  )
});

export default compose(
  withStyles(style),
  connect(
    mapStateToProps,
    {}
  )
)(AccountDetails);
