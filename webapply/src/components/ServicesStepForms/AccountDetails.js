import React from "react";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import cx from "classnames";
import get from "lodash/get";
import SectionTitle from "../SectionTitle";
import Select from "../InputField/PureSelect";
import Subtitle from "../Subtitle";
import Checkbox from "../InputField/Checkbox";
import FormWrapper from "../StakeholderStepForms/FormWrapper";
import { compose } from "recompose";
import { connect } from "react-redux";
import InfoTitle from "../InfoTitle";

const style = {
  checkboxesWrapper: {
    marginBottom: "30px"
  },
  checkboxWrapper: {
    marginTop: "10px"
  }
};

class AccountDetails extends React.Component {
  render() {
    const {
      classes,
      accountCurrencies: { datalist, title }
    } = this.props;
    return (
      <FormWrapper
        className={classes.formWrapper}
        handleContinue={this.props.goToNext}
      >
        <SectionTitle title="Account details" />

        <div className="paper">
          <Subtitle title="Select currencies" />
          <div className={cx("box-group-grid", classes.checkboxesWrapper)}>
            {datalist.map(option => (
              <Checkbox
                key={option.key}
                label={option.displayText}
                className={classes.checkboxWrapper}
              />
            ))}
          </div>
          <InfoTitle title={title} />
        </div>

        <div className="paper">
          <Subtitle title="Select branch" />
          <Grid container spacing={3}>
            <Grid item md={6} sm={12}>
              <Select id="Org.branchCity" />
            </Grid>
            <Grid item md={6} sm={12}>
              <Select id="Org.branchID" />
            </Grid>
          </Grid>
        </div>

        <div className="paper">
          <Subtitle title="Select interest" />
          <Checkbox label="I want to earn interest from my account" />
        </div>
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
